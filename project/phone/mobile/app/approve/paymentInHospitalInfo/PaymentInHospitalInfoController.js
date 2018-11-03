/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('paymentInHospitalInfoController', PaymentInHospitalInfoController);
    /* @ngInject */
    function PaymentInHospitalInfoController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.allPlanList = $stateParams.allPlanList;
        vm.contractTypeName = $stateParams.contractTypeName;
        vm.personName = $stateParams.personName;
        vm.noData = false;
        if(vm.allPlanList == null || vm.allPlanList.length == 0){
            vm.noData = true;
        }
    }

})(this.angular);