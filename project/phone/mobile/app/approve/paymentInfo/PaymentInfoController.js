/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('paymentInfoController', PaymentInfoController);
    /* @ngInject */
    function PaymentInfoController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.paymentPlanId = $stateParams.paymentPlanId;
        vm.personId = $stateParams.personId;
        vm.noData = false;
        getList();
        //取得老人一览
        function getList() {
            var account = auth.getObject("account");
            vm.credentials={
                paymentPlanId:vm.paymentPlanId,
                personId:vm.personId
            };
            var proc = Restangular.all('reqPaymentInfo');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.contract = ret.contract;
                    vm.cyclePlan = ret.cyclePlan;
                    vm.disposablePlan = ret.disposablePlan;

                }
            }, function() {

            });
        }

    }

})(this.angular);