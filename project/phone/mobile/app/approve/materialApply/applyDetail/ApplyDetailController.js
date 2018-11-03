/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('applyDetailController', ApplyDetailController);
    /* @ngInject */
    function ApplyDetailController($scope, $state, $rootScope, $ionicHistory,Restangular,$stateParams,toastr,auth){
        var vm = this;
        vm.requisitionId = $stateParams.requisitionId;

        vm.list;

        vm.noData = true;

        getApplyDetailList();
        //取得老人一览
        function getApplyDetailList() {
            var account = auth.getObject("account");
            vm.credentials={
                "requisitionId":vm.requisitionId
            };
            var proc = Restangular.all('reqApplyDetail');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    //物资明细
                    vm.list = ret.twRequisitionDetailList;
                    if(vm.list != null && vm.list.length != 0){
                        for (var i = 0 ;i<vm.list.length;i++){
                            vm.list[i].reqQuantity =vm.format(vm.list[i].reqQuantity);
                        }
                    }

                    vm.applicantName = ret.applicantName;
                    vm.applicantDivisionName = ret.applicantDivisionName;
                    vm.applicantMemo = ret.applicantMemo;
                }
            }, function() {

            });
        }

        vm.agreeApply = function(auditResult){
            $state.go("app.auditDetail", {
                type:16,
                auditResult:auditResult,
                inputParam:{
                    "requisitionId": vm.requisitionId
                }
            });
        }

        vm.format = function (value) {
            var number = value+"";
            number = number.replace(/,/g, "");
            if(isNaN(number) || number == "")return "";
            number = Math.round(number * 1000) / 1000;
            if (number < 0)
                return '-' + number.toFixed(2);
            else
                return number.toFixed(2);
        }


    }

})(this.angular);