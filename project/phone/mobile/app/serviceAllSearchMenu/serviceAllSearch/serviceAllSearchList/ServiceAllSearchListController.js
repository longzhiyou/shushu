/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('serviceAllSearchListController',ServcieAllSearchListController);
    /* @ngInject */
    function ServcieAllSearchListController($scope,Restangular,$stateParams,$state){

        var vm = this;
        init();
        function init(){
            vm.memberId = $stateParams.memberId;
            vm.accessDiv = $stateParams.accessDiv;
            vm.planDate = $stateParams.planDate;

            vm.page = 0;
            vm.isLock=false;
            vm.doRefresh = doRefresh;
            vm.loadMore = loadMore;
            vm.moredata = true;
            vm.state = "app.serviceAllSearchDetail";
            vm.personList;

            vm.personName;
            vm.age;
            vm.bedInfo;
            vm.assess;

            vm.credentials={
                "planDate":vm.planDate,
                "accessDiv":vm.accessDiv,
                "memberId":vm.memberId
            };
        }
        //迁移到子画面
        vm.toDetail = function(item){

            if (item.care_detail_no == null){
                return;
            }
            $state.go(vm.state, {
                memberId: vm.memberId,
                careDetailNo: item.care_detail_no,
                accessDiv:vm.accessDiv
            });
        }

        //取得服务一览
        function getServiceList() {
            vm.data=[];

            var proc = Restangular.all('reqServiceAllSearchServiceList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.personName = ret.personName;
                    vm.age = ret.age;
                    vm.headIconURL = ret.headIconURL;
                    if (vm.headIconURL == null ||vm.headIconURL=='' ){
                        vm.headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png');
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
                    for (var i = 0; i < vm.personList.length; i++) {
                        if (vm.personList[i].headIconURL == null ||vm.personList[i].headIconURL=='' ){
                            vm.personList[i].headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png');
                            if (vm.personList[i].plan_start_time!= null && vm.personList[i].plan_start_time.length >5){
                                vm.personList[i].plan_start_time =vm.personList[i].plan_start_time.substr(0,5);
                            }
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

    }


})(this.angular);