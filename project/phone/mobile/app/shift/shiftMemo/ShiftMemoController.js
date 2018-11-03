/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('shiftMemoController', ShiftMemoController);
    /* @ngInject */
    function ShiftMemoController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$ionicHistory,commonFuncService){
        var vm = this;
        vm.memberId = $stateParams.memberId;
        vm.staffScheduleId = $stateParams.staffScheduleId;
        vm.planDate = commonFuncService.formatDate("yyyyMMddhhmmssS",new Date());
        vm.infos =  $stateParams.infos;
        vm.memo = vm.infos.shiftMemo;
        vm.blnShift = true;
        if (vm.blnShift == true && "10" == vm.infos.shiftStatus) {
            // 已交班
            vm.blnShift = false;
        }
        //取得老人一览
        function getPersonList() {
            vm.message="";
            var account = auth.getObject("account");
            vm.credentials={
                "staffId": account.staffId,
                "memberId":vm.memberId,
                "workDate":vm.planDate
            };
            var proc = Restangular.all('reqPersonCareShiftInfo');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    vm.memo = ret.careComment;
                }

            }, function() {

            });
        }
        vm.save = function(){
            var account = auth.getObject("account");
            vm.infos=[{
                "memberId":vm.memberId,
                "shiftMemo":vm.memo
            }];
            vm.credentials={
                "staffId": account.staffId,
                "workDate":vm.planDate,
                "staffScheduleId":vm.staffScheduleId,
                "scheduleId":"",
                "temporaryStorage":"1",
                "staffName":account.staffName,
                "infos":vm.infos,
                "userName":"",
                "topOrgId":account.topOrgId
            };
            var proc = Restangular.all('reqCareShiftExec');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallShiftMethod",{});
                    $ionicHistory.goBack(-1);
                }

            }, function() {

            });
        }
        if (vm.memo == null || vm.memo == '') {
            getPersonList();
        }

    }

})(this.angular);