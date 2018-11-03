/**
 * 配置模块，主要是路由相关.
 *
 * Configures the UI-Router states and their associated URL routes and views
 * Also adds "state-change" reporting for debugging during development
 *
 * Created by longzhiyou on 2016-06-12.
 */
(function(angular){
    "use strict";
    angular.module("app").config(MemberListConfig);

    /* @ngInject */
    function MemberListConfig($stateProvider) {

        $stateProvider

            .state('app.memberInfo',
                {
                    url: '/memberList/memberInfo',
                    params: {
                        personId: null,
                        personName: ""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/member/memberInfo/MemberInfo.html'),
                            controller: 'memberInfoController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/member/memberInfo/MemberInfoService.js'),
                                                MobilePublic.getServerUrl('app/member/memberInfo/MemberInfoController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }
                })
            .state('app.livingCondition',
                {
                    url: '/memberList/memberInfo/livingCondition',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/member/memberInfo/LivingCondition.html'),
                            controllerAs: 'vm',
                            controller:function ($scope,$ionicHistory,baseDataService, memberInfoService,Restangular,$state) {
                                var vm = this;
                                vm.allInfo = memberInfoService.get();
                                vm.baseData = baseDataService.get();
                                vm.show =true;

                                //老人类型多选
                                vm.selectType={};
                                if (vm.allInfo.elderType&&vm.allInfo.elderType.length>0) {

                                    var list = vm.allInfo.elderType.split(",");
                                    for(var i=0;i<list.length;i++){
                                        vm.selectType[list[i].trim()]=true;
                                    }
                                }

                                vm.confirm=function(){

                                    var select=[];
                                    for(var key in vm.selectType){
                                        if (vm.selectType[key]) {
                                            select.push(key);
                                        }
                                    }
                                    vm.allInfo.elderType = select.join(",");

                                    // $ionicHistory.goBack(-1);
                                };

                                $scope.$on('$ionicView.leave',
                                    function () {
                                        vm.confirm();
                                    });

                                vm.changeList = function(idx){
                                    if(idx == 2){
                                        vm.allInfo.city = "";
                                        vm.allInfo.county = "";
                                        vm.allInfo.street = "";
                                    }
                                    if(idx == 3){
                                        vm.allInfo.county = "";
                                        vm.allInfo.street = "";
                                    }
                                    if(idx == 4){
                                        vm.allInfo.street = "";
                                    }
                                    doChange();
                                }
                                function doChange(){
                                    var getMap={
                                        "province": vm.allInfo.province,
                                        "city": vm.allInfo.city,
                                        "county":vm.allInfo.county
                                    };

                                    var proc = Restangular.all('reqAddressInfo');
                                    proc.post(getMap).then(function(ret) {
                                        if (ret.returnCode == "0") {
                                            vm.cityList = ret.cityList;
                                            vm.countyList = ret.countyList;
                                            vm.streetList = ret.streetList;
                                        }

                                    }, function() {

                                    });
                                }
                                doChange();
                                vm.toMap = function(){
                                    $state.go("app.memberMap", {
                                    });
                                }
                            }

                        }

                    }
                })
            .state('app.familyMember',
                {
                    url: '/memberList/memberInfo/familyMember',
                    params: {
                        personId: null
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/member/memberInfo/FamilyMember.html'),
                            controllerAs: 'vm',
                            controller:function ($scope,$ionicHistory,baseDataService, memberInfoService,$stateParams,Restangular,toastr) {
                                var vm = this;
                                vm.personId=$stateParams.personId;
                                vm.doRefresh = doRefresh;
                                vm.loadMore = loadMore;
                                vm.servedSibDtoList=[];
                                vm.moredata = true;
                                vm.searchInfo={
                                    "startNum":0,
                                    "pageNum":"10",
                                    "personId":vm.personId
                                };

                                //获取联系人列表信息
                                function getSibList(){
                                    var rest = Restangular.all('mobileServedPersonList');

                                    vm.searchInfo.startNum = vm.page;

                                    rest.post(vm.searchInfo).then(function(ret) {
                                        vm.error = false;


                                        var sibPersonList = ret.tservedSibDtoList;
                                        if (vm.page===0) {
                                            vm.servedSibDtoList = [];
                                        }

                                        for(var i = 0;i < sibPersonList.length;i++){
                                            if(sibPersonList[i].guardian){
                                                sibPersonList[i].guardian = "是";
                                            }else {
                                                sibPersonList[i].guardian = "否";
                                            }
                                            vm.servedSibDtoList.push(sibPersonList[i]);
                                        }

                                        if (vm.servedSibDtoList.length == (vm.page+10)){
                                            vm.moredata = true;
                                        } else {
                                            vm.moredata = false;
                                        }
                                        vm.page = vm.page +10;
                                        vm.isLock = false;
                                        $scope.$broadcast('scroll.infiniteScrollComplete');
                                        $scope.$broadcast('scroll.refreshComplete');

                                    }, function() {
                                        vm.moredata = false;
                                        $scope.$broadcast('scroll.infiniteScrollComplete');
                                        $scope.$broadcast('scroll.refreshComplete');
                                        vm.isLock = false;
                                        vm.message="系统异常";
                                        if (vm.message != '') {
                                            toastr.error(vm.message, "错误");
                                            return;
                                        }
                                    });

                                }

                                function doRefresh(){
                                    vm.page = 0;
                                    loadMore();
                                }
                                function loadMore(){
                                    if(vm.isLock)return;
                                    vm.isLock=true;
                                    getSibList();

                                }

                                vm.callTel= function(tel) {
                                    if (tel == null || tel == ''){
                                        return;
                                    }
                                    //window.open('tel:' + tel);
                                    window.plugins.CallNumber.callNumber(function onSuccess(result){
                                            console.log("Success:call number"+result);
                                        },
                                        function onError(result) {
                                            console.log("Error:call number"+result);
                                        },
                                        tel,true);
                                }
                            }
                        }

                    }
                })
            .state('app.interestMember',
                {
                    url: '/memberList/memberInfo/interestMember',
                    params: {
                        personId: null
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/member/memberInfo/InterestMember.html'),
                            controllerAs: 'vm',
                            controller:function ($scope,$ionicHistory,baseDataService, memberInfoService,$stateParams,Restangular,toastr) {
                                var vm = this;
                                vm.personId=$stateParams.personId;
                                vm.listPersonInterest=[];
                                vm.moredata = true;
                                vm.noData = false;
                                vm.searchInfo={
                                    "personId":vm.personId
                                };

                                //获取联系人兴趣爱好列表信息
                                function getInterestMemberList(){
                                    var rest = Restangular.all('mobileInterestMemberList');

                                    rest.post(vm.searchInfo).then(function(ret) {
                                        if (ret.returnCode == "0") {
                                            vm.listPersonInterest = ret.personInterestTypeList;
                                            vm.noData = false;
                                            if (vm.listPersonInterest == null || vm.listPersonInterest.length == 0){
                                                vm.noData = true;
                                            }
                                        }

                                    }, function() {

                                    });

                                }


                                function init() {

                                     getInterestMemberList();
                                }
                                init();
                            }
                        }

                    }
                })
            .state('app.medicalHistory',
                {
                    url: '/memberList/memberInfo/medicalHistory',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/member/memberInfo/MedicalHistory.html'),
                            controllerAs: 'vm',
                            controller:function ($scope,$ionicHistory,baseDataService, memberInfoService) {
                                var vm = this;
                                vm.allInfo = memberInfoService.get();
                                vm.baseData = baseDataService.get();

                                //疾病多选
                                vm.selectDisease={};
                                if (vm.allInfo.disease&&vm.allInfo.disease.length>0) {

                                    var selectDiseaseList = vm.allInfo.disease.split(",");
                                    for(var i=0;i<selectDiseaseList.length;i++){
                                        vm.selectDisease[selectDiseaseList[i].trim()]=true;
                                    }
                                }
                                //现身体状态多选
                                vm.selectPhysicalCondition={};
                                if (vm.allInfo.physicalCondition&&vm.allInfo.physicalCondition.length>0) {
                                    var list = vm.allInfo.physicalCondition.trim().split(",");
                                    for(var i=0;i<list.length;i++){
                                        vm.selectPhysicalCondition[list[i].trim()]=true;
                                    }
                                }

                                vm.confirm=function(){

                                    var disease=[];
                                    for(var key in vm.selectDisease){
                                        if (vm.selectDisease[key]) {
                                            disease.push(key);
                                        }
                                    }
                                    // if (disease.length>0) {
                                    //     vm.allInfo.disease = disease.join(",");
                                    // }
                                    vm.allInfo.disease = disease.join(",");

                                    var list=[];
                                    for(var key in vm.selectPhysicalCondition){
                                        if (vm.selectPhysicalCondition[key]) {
                                            list.push(key);
                                        }
                                    }
                                    vm.allInfo.physicalCondition = list.join(",");

                                };


                                $scope.$on('$ionicView.leave',
                                    function () {
                                        vm.confirm();
                                    });

                            }
                        }

                    }
                })

            .state('app.memberNeed',
                {
                    url: '/memberList/memberInfo/memberNeed',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/member/memberInfo/MemberNeed.html'),
                            controllerAs: 'vm',
                            controller:function ($scope,$ionicHistory,baseDataService, memberInfoService,$ionicPopup) {
                                var vm = this;
                                vm.allInfo = memberInfoService.get();
                                vm.baseData = baseDataService.get();
                                vm.select={};
                                if (vm.allInfo.demandService&&vm.allInfo.demandService.length>0) {
                                    var selectList = vm.allInfo.demandService.split(",");
                                    for(var i=0;i<selectList.length;i++){
                                        vm.select[selectList[i]]=true;
                                    }
                                }

                                vm.onHold= function(comment){
                                    var alertPopup = $ionicPopup.alert({
                                        title: '信息',
                                        template: comment
                                    });
                                    alertPopup.then(function(res) {

                                    });
                                };

                                vm.confirm=function(){
                                    var demandService=[];
                                    for(var key in vm.select){
                                        if (vm.select[key]) {
                                            demandService.push(key);
                                        }
                                    }
                                    if (demandService.length>0) {
                                        vm.allInfo.demandService = demandService.join(",");
                                    }

                                    console.info(vm.select);
                                };


                                $scope.$on('$ionicView.leave',
                                    function () {
                                        vm.confirm();
                                    });


                            }

                        }

                    }
                })
            .state('app.memberMap',
                {
                    url: '/memberList/memberInfo/memberMap',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/member/memberInfo/MemberMap.html'),
                            controllerAs: 'vm',
                            controller:function ($scope,$ionicHistory,baseDataService, memberInfoService,toastr) {
                                var vm = this;
                                vm.allInfo = memberInfoService.get();
                                vm.baseData = baseDataService.get();
                                vm.marker;
                                vm.lat = vm.allInfo.latitude;
                                vm.lng = vm.allInfo.longitude;

                                vm.map =  new BMap.Map("allmap");   // 创建Map实例
                                vm.addMarker = function (point){
                                    if (vm.marker != null){
                                        vm.map.removeOverlay(vm.marker);
                                    }
                                    vm.marker = new BMap.Marker(point);
                                    vm.map.addOverlay(vm.marker);
                                    vm.marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                                    vm.marker.enableDragging();

                                };
                                //百度地图API功能
                                // var map = new BMap.Map("allmap");   // 创建Map实例

                                vm.map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);  // 初始化地图,设置中心点坐标和地图级别
                                if (vm.lat!='' && vm.lng!='' && vm.lat!=null && vm.lng!=null){
                                    var point = new BMap.Point(vm.lng , vm.lat);
                                    vm.map.centerAndZoom(point, 15);
                                    vm.addMarker(point);
                                } else {
                                    var key = vm.allInfo.busStation;
                                    if (key !='') {
                                        var local = new BMap.LocalSearch(vm.map, {
                                            renderOptions: {map: vm.map}
                                        });
                                        local.search(key);
                                    }
                                }

                                //单击获取点击的经纬度
                                // vm.map.addEventListener("click",function(e){
                                //     toastr.info(e.point.lng + "," + e.point.lat);
                                //     // var point = new BMap.Point(e.point.lng , e.point.lat);
                                //     // vm.allInfo.longitude = e.point.lng;
                                //     // vm.allInfo.latitude = e.point.lat;
                                //     // vm.addMarker(point);
                                // });

                                /**
                                 *  模拟click的办法，大致思路是：
                                 *  在touchstart、touchend时记录时间、手指位置，
                                 *  在touchend时进行比较，如果手指位置为同一位置（或允许移动一个非常小的位移值）且时间间隔较短（一般认为是200ms），
                                 *  且过程中未曾触发过touchmove，即可认为触发了手持设备上的“click”，一般称它为“tap”
                                 * [2017-09-12 add by longzhiyou]
                                 */

                                vm.map.addEventListener("touchstart",function(e){
                                    // toastr.info("touchstart"+e.point.lng + "," + e.point.lat);
                                    vm.clientX = e.touches[0].clientX;
                                    vm.clientY = e.touches[0].clientY;
                                    vm.touchmove = false;
                                });

                                vm.map.addEventListener("touchmove",function(e){
                                    // toastr.info("touchstart"+e.point.lng + "," + e.point.lat);
                                    vm.touchmove = true;
                                });



                                vm.map.addEventListener("touchend",function(e){
                                    // toastr.info("touchstart"+e.point.lng + "," + e.point.lat);


                                    if (vm.clientX == e.changedTouches[0].clientX
                                        && vm.clientY == e.changedTouches[0].clientY
                                        // && !vm.touchmove

                                    ) {
                                        var point = new BMap.Point(e.point.lng, e.point.lat);
                                        vm.allInfo.longitude = e.point.lng;
                                        vm.allInfo.latitude = e.point.lat;
                                        vm.addMarker(point);
                                    }

                                    vm.touchmove = false;
                                });
                                 vm.map.enableScrollWheelZoom(true);

                            //     map.addEventListener("click",function(e){
                            //         toastr.info("click");
                            //         var point = new BMap.Point(e.point.lng , e.point.lat);
                            //         vm.allInfo.longitude = e.point.lng;
                            //         vm.allInfo.latitude = e.point.lat;
                            //         vm.addMarker(point);
                            //     });

                                 // 定义一个控件类,即function
                                 function ZoomControl(){
                                     // 默认停靠位置和偏移量
                                     this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
                                     this.defaultOffset = new BMap.Size(10, 70);
                                 }

                                 // 通过JavaScript的prototype属性继承于BMap.Control
                                 ZoomControl.prototype = new BMap.Control();
                                 // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
                                 // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
                                 ZoomControl.prototype.initialize = function(map){
                                     // 创建一个DOM元素
                                     var div = document.createElement("div");
                                     // 添加文字说明
                                     var html =    '';
                                     html = html+   '<input id="sole-input" class="sfz4" type="text" name="word" autocomplete="off" maxlength="256" placeholder="搜地点" value="">';
                                     html = html+   '<input id="search" class="sfz3" onclick="vm.searchAddr();" type="button" value="检索">';
                                     html = html+   '<div id="r-result" ng-if="vm.show" style="height:400px;overflow-y:auto;display: none"></div>';
                                     div.innerHTML=(html);
                                     // 设置样式

                                     div.style.backgroundColor="#8EC448";
                                     div.style.width="352px";
                                     div.style.height="34px";
                                     div.style.verticalAlign="middle";
                                     div.style.display= "table-cell";
                                     div.style.position= "absolute"

                                     // 添加DOM元素到地图中
                                     map.getContainer().appendChild(div);
                                     // 将DOM元素返回
                                     return div;
                                 };

                                 // 创建控件
                                 var myZoomCtrl = new ZoomControl();
                                 // 添加到地图当中
                                vm.map.addControl(myZoomCtrl);
                                 var oDiv = document.getElementById('search');   //获取元素div
                                 oDiv.onclick = function(){   //给元素增加点击事件
                                     vm.searchAddr();
                                 };
                                 vm.searchAddr = function (){
                                     vm.map.clearOverlays();
                                     if (vm.lat!='' && vm.lng!='') {
                                         var point = new BMap.Point(vm.lng, vm.lat);
                                         vm.addMarker(point);
                                     }
                                     var value =  document.getElementById('sole-input').value;
                                     if (value != ''){
                                         vm.show = true;
                                         var local = new BMap.LocalSearch(vm.map,{
                                             renderOptions:{map: vm.map, panel: "r-result"}
                                         });
                                         local.search(value);
                                     }

                                 }
                             }

                        }
                    }
                })


        ;
  
    }

})(this.angular);