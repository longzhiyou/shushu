/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('shiftPersonListController', ShiftPersonListController);
    /* @ngInject */
    function ShiftPersonListController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$ionicPopup){
        var vm = this;
        vm.page = 0;
        vm.isLock=false;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.state = "app.shiftMemo";
        vm.personList;
        vm.noData = false;
        vm.accessDiv = $stateParams.accessDiv;
        vm.planDate = new Date();
        vm.credentials;
        vm.staffScheduleId;
        vm.scheduleList;
        vm.blnShift = true;
        vm.index = 0;
        //取得老人一览
        function getPersonList() {
            vm.message="";
            var account = auth.getObject("account");
            vm.credentials={
                "staffId": account.staffId,
                "topOrgId":account.topOrgId,
                "staffScheduleId":vm.staffScheduleId
            };
            var proc = Restangular.all('reqCareShiftInfo');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.scheduleList = ret.scheduleList;
                    for (var i = 0;i<vm.scheduleList.length;i++){
                        if (vm.index == i){
                            vm.scheduleList[i].style = "color:white;background:#11c1f3";
                        } else {
                            vm.scheduleList[i].style = "color:#11c1f3;background:white";
                        }
                    }
                    vm.staffScheduleId = ret.staffScheduleId;
                    if (vm.page == 0) {
                        vm.personList = ret.infos;
                        if(vm.personList != null) {
                            for (var i = 0; i < vm.personList.length; i++) {
                                if (vm.personList[i].avatarPath == null || vm.personList[i].avatarPath == 'pc/img/avatar.png') {
                                    vm.personList[i].avatarPath = MobilePublic.getServerUrl('assets/img/home/photo.png', true);
                                }
                                if ("00" == vm.personList[i].shiftStatus) {
                                    vm.personList[i].statusText = "接";
                                } else if ("10" == vm.personList[i].shiftStatus) {
                                    vm.personList[i].statusText = "交";
                                } else if ("91" == vm.personList[i].shiftStatus) {
                                    vm.personList[i].statusText = "假";
                                } else if ("80" == vm.personList[i].shiftStatus) {
                                    vm.personList[i].statusText = "退";
                                } else {
                                    vm.personList[i].statusText = "住";
                                }
                                if (vm.blnShift == true && "10" == vm.personList[i].shiftStatus) {
                                    // 已交班
                                    vm.blnShift = false;
                                }
                            }
                        }
                    } else {
                        var personList = ret.infos;
                        for (var i = 0; i < personList.length; i++) {
                            if (personList[i].avatarPath == null ||personList[i].avatarPath=='pc/img/avatar.png' ) {
                                personList[i].avatarPath = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            }
                        }
                    }

                    vm.moredata = false;
                    vm.noData = false;
                    if (vm.personList.length == 0){
                        vm.noData = true;
                        vm.blnShift = false;
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
        //上拉取得数据
        function loadMore(){
            if(vm.isLock)return;
            vm.isLock=true;
            getPersonList();

        }
        //实施回调函数
        vm.search = function(){
            vm.page = 0;
            loadMore();
        }
        vm.changeShift = function(staffScheduleId){
            vm.staffScheduleId = staffScheduleId;
            for (var i = 0;i<vm.scheduleList.length;i++){
                if (staffScheduleId == vm.scheduleList[i].scheduleId){
                    vm.index = i;
                }
            }
            vm.page = 0;
            loadMore();
        }
        vm.save = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '确认',
                template: '提交后将不能修改！确认交班吗？'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    dosave();
                } else {
                    return;
                }
            });
        }
        function dosave(){
            vm.infos=[];
            for (var i = 0;i<vm.personList.length ;i++){
                var info ={
                    "memberId":vm.personList[i].memberId,
                    "shiftMemo":vm.personList[i].shiftMemo
                }
                vm.infos.push(info);
            }
            var account = auth.getObject("account");
            vm.credentials={
                "staffId": account.staffId,
                "workDate":vm.planDate,
                "staffScheduleId":vm.staffScheduleId,
                "scheduleId":"",
                "staffName":account.staffName,
                "infos":vm.infos ,
                "userName":"",
                "topOrgId":account.topOrgId
            };
            var proc = Restangular.all('reqCareShiftExec');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    vm.page = 0;
                    loadMore();
                }

            }, function() {

            });
        }
        $rootScope.$on("CallShiftMethod",function(){
            vm.page = 0;
            loadMore();
        });
    }

})(this.angular);