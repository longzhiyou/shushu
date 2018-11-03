/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('checkOutDetailController', CheckOutDetailController);
    /* @ngInject */
    function CheckOutDetailController(Restangular,$stateParams,auth,$state,permissions){
        var vm = this;
        vm.permission="RCY302";
        vm.permissions = permissions;
        vm.memberId = $stateParams.memberId;
        vm.applyId = $stateParams.applyId;
        vm.param = $stateParams.param;

        vm.agreeApply = function(auditResult){
            var inputParam= {
                "memberId" : vm.memberId,
                "applyId" : vm.applyId,
            }
            $state.go("app.auditDetail", {
                type: 22,
                inputParam: inputParam,
                auditResult:auditResult
            });
        }
    }

})(this.angular);