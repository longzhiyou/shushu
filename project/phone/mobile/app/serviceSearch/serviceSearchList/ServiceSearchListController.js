/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('serviceSearchListController',ServcieSearchListController);
    /* @ngInject */
    function ServcieSearchListController($scope,Restangular,$stateParams,$state,toastr,$rootScope){

        var vm = this;

        vm.memberId = $stateParams.memberId;
        vm.accessDiv = $stateParams.accessDiv;
        vm.planDate = $stateParams.planDate;

        vm.page = 0;
        vm.isLock=false;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.state = "app.serviceSearchDetail";
        vm.personList;

        vm.personName;
        vm.age;
        vm.bedInfo;
        vm.assess;
        vm.showPayButton = false;
        vm.selectButton = false;
        vm.credentials={
            "planDate":vm.planDate,
            "accessDiv":null,
            "memberId":vm.memberId
        };
        vm.data = {
            showDelete: false
        };
        //迁移到子画面
        vm.toDetail = function(item){
            if (vm.selectButton == true){
                vm.selectButton = false;
                return;
            }
            $state.go("app.serviceSearchDetail", {
                memberId: vm.memberId,
                careDetailNo: item.care_detail_no,
                accessDiv:vm.accessDiv,
                dealNo:item.dealNo,
                planDate:vm.planDate
            });
        }

        //取得服务一览
        function getServiceList() {
            vm.data=[];
            vm.credentials={
                "planDate":vm.planDate,
                "accessDiv":null,
                "memberId":vm.memberId
            };
            var proc = Restangular.all('reqServiceSearchServiceList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.personName = ret.personName;
                    vm.age = ret.age;
                    vm.headIconURL = ret.headIconURL;
                    if (vm.headIconURL == null ||vm.headIconURL=='' ){
                        vm.headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                    }

                    var title;
                    var data;
                    title = "床位：";
                    data = ret.bedInfo;
                    if (data == null){
                        data = "";
                    }
                    vm.bedInfo = title + data;
                    vm.tel = ret.telNum;
                    vm.personList = ret.personList;
                    vm.showPayButton = false;
                    for (var i = 0; i < vm.personList.length; i++) {
                        if (vm.personList[i].headIconURL == null || vm.personList[i].headIconURL == '') {
                            vm.personList[i].headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png', true);
                            if (vm.personList[i].plan_start_time != null && vm.personList[i].plan_start_time.length > 5) {
                                vm.personList[i].plan_start_time = vm.personList[i].plan_start_time.substr(0, 5);
                            }
                        }
                       if( vm.personList[i].dealNo!=null){
                           vm.personList[i].is_record = "select-uncheck";
                           vm.showPayButton = true;
                        }
                    }
                    vm.moredata = false;
                    vm.page = vm.page +10;
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

        vm.callTel= function() {
            window.plugins.CallNumber.callNumber(function onSuccess(result){
                    console.log("Success:call number"+result);
                },
                function onError(result) {
                    console.log("Error:call number"+result);
                },
                vm.tel,true);
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
        vm.toPay = function(){
            if (vm.data.length == 0){
                toastr.error("请先选中一个项目", "错误");
                return;
            }
            vm.dealNo = [];
            for (var i = 0;i<vm.data.length;i++) {
                var personInfo = vm.personList[vm.data[i]];
                if (personInfo.dealNo != null) {
                    vm.dealNo.push(personInfo.dealNo)
                }
            }
            if (vm.dealNo != null && vm.dealNo.length >0) {
                $state.go("app.pay", {
                    type: 0,
                    dealNo: vm.dealNo
                });
            }
        }
        //实施回调函数
        $rootScope.$on("CallServiceSearchMethod",function(){
            vm.page = 0;
            loadMore();
        });
        vm.change = function(){
            vm.data.showDelete = !vm.data.showDelete;
        }
        vm.onItemDelete = function(item) {
            vm.page = 0;
            vm.credentials={
                "planDate":vm.planDate,
                "accessDiv":null,
                "memberId":vm.memberId,
                "careDetailNo":item.care_detail_no,
                "careNo":item.care_no
            };
            var proc = Restangular.all('reqServiceImmDel');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.personName = ret.personName;
                    vm.age = ret.age;
                    vm.headIconURL = ret.headIconURL;
                    if (vm.headIconURL == null ||vm.headIconURL=='' ){
                        vm.headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                    }

                    var title;
                    var data;
                    title = "床位：";
                    data = ret.bedInfo;
                    if (data == null){
                        data = "";
                    }
                    vm.bedInfo = title + data;
                    vm.tel = ret.telNum;
                    vm.personList = ret.personList;
                    vm.showPayButton = false;
                    for (var i = 0; i < vm.personList.length; i++) {
                        if (vm.personList[i].headIconURL == null || vm.personList[i].headIconURL == '') {
                            vm.personList[i].headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png', true);
                            if (vm.personList[i].plan_start_time != null && vm.personList[i].plan_start_time.length > 5) {
                                vm.personList[i].plan_start_time = vm.personList[i].plan_start_time.substr(0, 5);
                            }
                        }
                        if( vm.personList[i].dealNo!=null){
                            vm.personList[i].is_record = "select-uncheck";
                            vm.showPayButton = true;
                        }
                    }
                    vm.moredata = false;
                    vm.page = vm.page +10;
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
        };
    }


})(this.angular);