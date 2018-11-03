/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('staffListController', StaffListController);
    /* @ngInject */
    function StaffListController($scope, $rootScope, auth,Restangular,$stateParams,toastr, ionicDatePicker){
        var vm = this;
        vm.page = 0;
        vm.isLock=false;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.state = "app.serviceSearchList";
        vm.personList;
        vm.accessDiv = $stateParams.accessDiv;
        vm.noData = false;

        vm.planDate = moment(new Date()).format("YYYY-MM-DD");
        var ipObj1 = {
            callback: function (val) {  //Mandatory
                vm.planDate = moment(val).format("YYYY-MM-DD");
                vm.page = 0;
                loadMore();
            }
        };

        vm.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        vm.credentials={
            "startNum":vm.page,
            "pageNum":"10",
            "searchContent":vm.searchContent
        };
        //取得老人一览
        function getPersonList() {
            vm.message="";
            var account = auth.getObject("account");
            vm.credentials={
                "startNum":vm.page,
                "pageNum":"10",
                "searchContent":vm.searchContent
            };
            var proc = Restangular.all('reqStaffInfoList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {

                    if (vm.page == 0) {
                        vm.personList = ret.staffList;
                        for (var i = 0; i < vm.personList.length; i++) {
                            if (vm.personList[i].avatarThumbnaiName == null ||vm.personList[i].avatarThumbnaiName=='' ){
                                vm.personList[i].avatarThumbnaiName = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            }
                        }
                    } else {
                        var personList = ret.staffList;
                        for (var i = 0; i < personList.length; i++) {
                            if (personList[i].avatarThumbnaiName == null ||personList[i].avatarThumbnaiName=='' ) {
                                personList[i].avatarThumbnaiName = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            }
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

})(this.angular);