/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('serviceListController',ServcieListController);
    /* @ngInject */
    function ServcieListController($scope,$cordovaGeolocation,$ionicPopup,$ionicPlatform,$cordovaBarcodeScanner,$rootScope,Restangular,$stateParams,auth,$state,toastr,commonFuncService){

        var vm = this;

        vm.memberId = $stateParams.memberId;
        vm.accessDiv = $stateParams.accessDiv;

        vm.page = 0;
        vm.isLock=false;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.state = "app.serviceImmp";
        vm.handwrite = "app.handWrite";
        vm.personList;
        vm.lat=0;
        vm.lng=0;
        vm.data=[];
        vm.planDate = new Date();
        vm.personName;
        vm.age;
        vm.bedInfo;
        vm.assess;
        vm.carePhotoData;
        vm.careDetailNos;
        vm.checkQrCode = "0";
        vm.serviceImm={};
        vm.selectButton = false;
        vm.credentials={
            "planDate":vm.planDate,
            "accessDiv":vm.accessDiv,
            "memberId":vm.memberId
        };
        vm.dealNo=[];
        vm.showTel = false;
        vm.noData = false;
        if (vm.accessDiv == 2){
            vm.showTel = true;
        }
        vm.tel;
        //迁移到子画面
        vm.toDetail = function(item){
            if (vm.selectButton == true){
                vm.selectButton = false;
                return;
            }

            $state.go("app.serviceImmp", {
                memberId: vm.memberId,
                careNo: item.care_no,
                accessDiv:vm.accessDiv,
                dealNo:item.dealNo
            });
        }
        //迁移到手写板
        vm.toHandWrite =function (){
            if (vm.data.length == 0){
                toastr.error("请先选中一个项目", "错误");
                return;
            }
            vm.doImmAll();
        }

        //取得服务一览
        function getServiceList() {
            vm.data=[];

            var proc = Restangular.all('reqServiceImmServiceList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.personName = ret.personName;
                    vm.age = ret.age;
                    vm.headIconURL = ret.headIconURL;
                    vm.bedInfo = ret.bedInfo;
                    if (vm.headIconURL == null ||vm.headIconURL=='' ){
                        vm.headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png');
                    }

                    vm.tel = ret.telNum;
                    vm.personList = ret.personList;
                    for (var i = 0; i < vm.personList.length; i++) {
                        if (vm.personList[i].headIconURL == null ||vm.personList[i].headIconURL=='' ){
                            vm.personList[i].headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            if (vm.personList[i].plan_start_time!= null && vm.personList[i].plan_start_time.length >5){
                                vm.personList[i].plan_start_time =vm.personList[i].plan_start_time.substr(0,5);
                            }
                        }
                        vm.personList[i].is_record = "select-uncheck";
                    }
                    $rootScope.$emit("CallPersonListMethod",{});
                    vm.moredata = false;
                    vm.page = vm.page +10;
                    vm.noData = false;
                    if (vm.personList.length == 0){
                        vm.noData = true;
                    }
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                vm.isLock = false;
            }, function() {
                vm.moredata = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                vm.isLock = false;

            });
        }
        //下拉刷新
        function doRefresh(){
            vm.page = 0;
            loadMore();
        }
        //上拉取得
        function loadMore(){
            if(vm.isLock)return;
            vm.isLock=true;
            getServiceList();

        }
        //getServiceList();
        function formatData(date){
            if (date.length >=8){
                var year = date.substr(0,4);
                var month = date.substr(4,2);
                var day = date.substr(6,2);
                return year + "-" + month + "-" + day;
            } else {
                return date;
            }
        }
        //选择按钮处理
        vm.selectBtn = function(idx) {
            vm.selectButton = true;
            var personInfo = vm.personList[idx];
            var index = isExist(vm.data,idx);
            if (index >= 0){
                vm.data = delData(vm.data,index);
                personInfo.is_record = "select-uncheck";
            } else {
                vm.data.push(idx);
                personInfo.is_record = "select-checked";

            }
        };
        //选择按钮关联
        function isExist(list,careNo){
            if (list != null) {
                for (var i = 0; i < list.length; i++) {
                    if (careNo == list[i]) {
                        return i;
                    }
                }
            }
            return -1;
        }
        //list中删除数据
        function delData(list,n){
            return list.slice(0,n).concat(list.slice(n+1,list.length));
        }

        //服务实施
        vm.doImmAll = function() {

            var myDate = new Date();
            var strDate = commonFuncService.formatDate("yyyyMMddhhmmssS",myDate);
            var careParamList=[];
            vm.dealNo = [];
            for (var i = 0;i<vm.data.length;i++){
                var personInfo = vm.personList[vm.data[i]];
                if ( i == 0){
                    vm.careDetailNos = strDate + i;
                } else {
                    vm.careDetailNos = vm.careDetailNos + "," + strDate + i;
                }
                if (personInfo.dealNo != null){
                    vm.dealNo.push(personInfo.dealNo)
                }
                var immData ={
                    "memberId":vm.memberId,
                    "planDate":commonFuncService.formatDate("yyyyMMdd",vm.planDate),
                    "careDate":strDate + i,
                    "careNo":personInfo.care_no,
                    "serviceId":personInfo.service_id,
                    "careItemId":personInfo.careItemId,
                    "careSubItemId":personInfo.careSubItemId,
                    "careParaId":personInfo.careParaId,
                    "careValue":"",
                    "comment":""
                }
                careParamList.push(immData);
            }
            var account = auth.getObject("account");

            vm.serviceImm={
                "userId": account.userId,
                "staffId": account.staffId,
                "planDate":commonFuncService.formatDate("yyyyMMdd",vm.planDate),
                "access_div":vm.accessDiv,
                "staffName": account.staffName,
                "isFormatFile": "",
                "requestType": "100000",
                "careParamList":careParamList,
                "careInfoList":[]
            };

            var proc = Restangular.all('synCareClientServerHandle');
            proc.post(vm.serviceImm).then(function(ret) {
                vm.isLock=true;
                vm.error = false;
                if (ret.returnCode == "0") {
                    vm.moredata = true;
                    getServiceList();
                 }
                vm.isLock = false;

            }, function() {
                vm.moredata = false;

                vm.isLock = false;

            });
        };

        //实施回调函数
        $rootScope.$on("CallServiceMethod",function(){
            getServiceList();
        });
        $rootScope.$on("CallPayModeMethod",function() {
            getServiceList();
        });
        //手写回调函数
        $rootScope.$on("CallServiceHandWriteMethod",function(e,data){
            getServiceList();
        });

    }


})(this.angular);