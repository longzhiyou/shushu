/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('returnVisitListController',ReturnVisitListController);
    /* @ngInject */
    function ReturnVisitListController($scope,Restangular,$stateParams,$state,toastr,$rootScope,baseDataService, ionicDatePicker,permissions,$ionicHistory,customerInfoService){

        var vm = this;
        vm.customerId = $stateParams.customerId;
        vm.permission="RCY403";
        vm.state = "app.returnVisitAllList";
        vm.allInfo = customerInfoService.get();
        vm.baseData = baseDataService.get();

        //vm.allInfo.returnVisitList=[];
        vm.permissions = permissions;
        //vm.save = save;
        vm.saveFlg = false;
        vm.noData = false;


        vm.add = function(){
            $state.go(vm.state, {
                returnVisitId: 0
            });
        }

        //回调
        $rootScope.$on("CustomerReturnMethod",function(e,data){
            vm.allInfo.returnVisitList.push(data.data);
            vm.noData = false;

        });

        $scope.returnVisitDetail = function(item){
            console.log(item);
            var index = vm.allInfo.returnVisitList.indexOf(item);
            console.log(index);
            $state.go(vm.state, {
                data: item,
                index:index
            });
        }

        $scope.delete = function(item) {
            var index1 = vm.allInfo.returnVisitList.indexOf(item);
            if(index1 != null){
                vm.allInfo.returnVisitList.splice(index1, 1);
            }
        };
        init();
        function init() {

            if(vm.allInfo.returnVisitList.length == 0){
                vm.noData = true;
            }else {
                for(var i=0;i<vm.allInfo.returnVisitList.length;i++){
                    if(vm.allInfo.returnVisitList[i].returnVisitDate){
                        vm.allInfo.returnVisitList[i].returnVisitDate = moment(vm.allInfo.returnVisitList[i].returnVisitDate).format("YYYY-MM-DD");
                    }
                }
            }

        }

    }


})(this.angular);