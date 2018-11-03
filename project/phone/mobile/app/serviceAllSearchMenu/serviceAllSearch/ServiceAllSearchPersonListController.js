/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('serviceAllSearchPersonListController', ServcieAllSearchPersonListController);
    /* @ngInject */
    function ServcieAllSearchPersonListController($scope, Restangular,$stateParams,ionicDatePicker){
        var vm = this;

        init();

        function init(){
            vm.page = 0;
            vm.isLock=false;
            vm.doRefresh = doRefresh;
            vm.loadMore = loadMore;
            vm.moredata = true;
            vm.state = "app.serviceAllSearchList";
            vm.personList;
            vm.accessDiv = $stateParams.accessDiv;
            vm.noData = false;
            vm.planDate = moment(new Date()).format("YYYY-MM-DD");
            var ipObj1 = {
                callback: function (val) {  //Mandatory
                    vm.planDate = moment(val).format("YYYY-MM-DD");
                    vm.page = 0;
                    loadMore();
                },
                to: null,
            };

            vm.openDatePicker = function(){
                ionicDatePicker.openDatePicker(ipObj1);
            };

            vm.credentials={
                "planDate":vm.planDate,
                "accessDiv":vm.accessDiv,
                "searchContent":vm.searchContent
            };
        }
        //取得老人一览
        function getPersonList() {
            vm.message="";
            vm.credentials={
                "planDate":vm.planDate,
                "accessDiv":vm.accessDiv,
                "searchContent":vm.searchContent
            };
            var proc = Restangular.all('reqServiceAllSearchPersonList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {

                    if (vm.page == 0) {
                        vm.personList = ret.personList;
                        for (var i = 0; i < vm.personList.length; i++) {
                            if (vm.personList[i].headIconURL == null ||vm.personList[i].headIconURL=='' ){
                                vm.personList[i].headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png');
                            }
                            var title;
                            var data;
                            title = "床位：";
                            data = vm.personList[i].bedInfo;
                            vm.personList[i].bedInfo = title + data;
                        }
                    } else {
                        var personList = ret.personList;
                        for (var i = 0; i < personList.length; i++) {
                            if (personList[i].headIconURL == null ||personList[i].headIconURL=='' ) {
                                personList[i].headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png');
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

                    if (vm.personList.length == (vm.page+10)){
                        vm.moredata = true;
                    } else {
                        vm.moredata = false;
                    }
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
        //上拉取得数据
        function loadMore(){
            if(vm.isLock)return;
            vm.isLock=true;
            getPersonList();

        }
        vm.search = function(){
            vm.page = 0;
            loadMore();
        }
        $scope.$on("$ionicView.beforeEnter",function(){
            vm.page = 0;
            loadMore();
        });
    }

})(this.angular);