/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('intentionalityCustomerListController', IntentionalityCustomerListController);
    /* @ngInject */
    function IntentionalityCustomerListController($scope,$rootScope,permissions, $state,Restangular,$stateParams,toastr,baseDataService){
        var vm = this;
        vm.page = 0;
        vm.isLock=false;
        vm.accessDiv = $stateParams.accessDiv;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.nodata = false;
        vm.customerList;
        vm.permission="RCY403";
        vm.searchContent="";
        vm.state = "app.intentionalityCustomerInfo";
        vm.permissions = permissions;
        vm.status = "";
        vm.baseData = baseDataService.get();
        vm.credentials={
            "startNum":vm.page,
            "pageNum":"10",
            "searchContent":vm.searchContent,
            "status":vm.status
        };


        function getCustomerList() {
            vm.credentials={
                "startNum":vm.page,
                "pageNum":"10",
                "searchContent":vm.searchContent,
                "status":vm.status
            };
            vm.message= "";
            var proc = Restangular.all('reqCustomerInfoList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    if (vm.page == 0) {
                        vm.customerList = ret.customerList;

                    } else {
                        var customerList = ret.customerList;
                        for (var i = 0; i < customerList.length; i++) {

                            vm.customerList.push(customerList[i]);

                        }


                    }

                    if (vm.customerList.length == (vm.page+10)){
                        vm.moredata = true;
                    } else {
                        vm.moredata = false;
                    }
                    vm.page = vm.page +10;
                    vm.noData = false;
                    if (vm.customerList.length == 0){
                        vm.noData = true;
                    }
                } else if (ret.returnCode == "1") {
                    vm.error = true;
                    vm.moredata = false;
                    vm.message=ret.message;
                } else if (ret.returnCode == "8") {
                    vm.error = true;
                    vm.moredata = false;
                    vm.message=ret.message;
                } else {
                    vm.error = true;
                    vm.moredata = false;
                    vm.message="系统异常";
                }
                if (vm.message != '') {
                    toastr.error(vm.message, "错误");
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                vm.isLock = false;
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
            getCustomerList();

        }
        vm.add = function(){
            $state.go(vm.state, {
                customerId: 0
            });
        }
        vm.search = function(){
            vm.page = 0;
            loadMore();
        }
        //实施回调函数
        $rootScope.$on("CallCustomerListMethod",function(){
            vm.page = 0;
            loadMore();
        });
        $scope.$on("$ionicView.beforeEnter",function(){
            vm.page = 0;
            loadMore();
        });
        $scope.$watch('vm.status',function(newV,oldV){
            doRefresh();
        });
    }

})(this.angular);