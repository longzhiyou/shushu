/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('servicePersonListController', ServciePersonListController);
    /* @ngInject */
    function ServciePersonListController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth){
        var vm = this;
        vm.page = 0;
        vm.isLock=false;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.state = "app.serviceList";
        vm.personList;
        vm.noData = false;
        vm.accessDiv = $stateParams.accessDiv
        vm.planDate = new Date();
        vm.credentials={
            "userId":"",
            "planDate":vm.planDate,
            "accessDiv":vm.accessDiv,
            "searchContent":vm.searchContent
        };
        //取得老人一览
        function getPersonList() {
            vm.message="";
            var account = auth.getObject("account");
            vm.credentials={
                "userId": account.userId,
                "planDate":vm.planDate,
                "accessDiv":vm.accessDiv,
                "searchContent":vm.searchContent
            };
            var proc = Restangular.all('reqServiceImmPersonList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {

                    if (vm.page == 0) {
                        vm.personList = ret.personList;
                        for (var i = 0; i < vm.personList.length; i++) {
                            if (vm.personList[i].headIconURL == null ||vm.personList[i].headIconURL=='' ){
                                vm.personList[i].headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            }
                            var title;
                            var data;
                            title = "床位：";
                            data = vm.personList[i].bedInfo;
                            if (data == null){
                                data = "";
                            }
                            vm.personList[i].bedInfo = title + data;
                        }
                    } else {
                        var personList = ret.personList;
                        for (var i = 0; i < personList.length; i++) {
                            if (personList[i].headIconURL == null ||personList[i].headIconURL=='' ) {
                                personList[i].headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            }
                            var title;
                            var data;
                            title = "床位：";
                            data = vm.personList[i].bedInfo;
                            if (data == null){
                                data = "";
                            }
                            personList[i].bedInfo = title + data;
                            vm.personList.push(personList[i]);

                        }
                    }

                    vm.moredata = false;
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
        //上拉取得数据
        function loadMore(){
            if(vm.isLock)return;
            vm.isLock=true;
            getPersonList();

        }
        //实施回调函数
        $rootScope.$on("CallPersonListMethod",function(){
            //getPersonList();
        });
        vm.search = function(){
            vm.page = 0;
            loadMore();
        }
    }

})(this.angular);