/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('otherAgreeLeaveController', OtherAgreeLeaveController);
    /* @ngInject */
    function OtherAgreeLeaveController($scope, $rootScope,permissions, $ionicHistory,Restangular,$stateParams,toastr,auth){
        var vm = this;
        vm.permission="SFM201";
        vm.permissions = permissions;
        vm.leaveApplyId = $stateParams.leaveApplyId;
        vm.staffId = $stateParams.staffId;
        vm.auditId = $stateParams.auditId;
        vm.sourceLeaveApplyId = $stateParams.sourceLeaveApplyId;
        vm.leaveApplyType = $stateParams.leaveApplyType;
        vm.buttonName;
        vm.bigAuditor;
        vm.switchInstitute = { checked: false };

        getAuditorList();
        //取得老人一览
        function getAuditorList() {
            var account = auth.getObject("account");
            vm.credentials={
                "leaveApplyId":vm.leaveApplyId,
                "staffId":vm.staffId
            };
            var proc = Restangular.all('reqAuditorList');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    vm.auditorList = ret.listAuditor;
                    vm.auditorId = "";
                    vm.buttonName = "机构：";
                    vm.bigAuditor = 2;
                }
            }, function() {

            });
        }

        vm.getAuditors = function(auditor){
            console.info(auditor);
            //查询机构审核人
            if(auditor == 1){
                vm.switchInstitute = { checked: false };
                vm.buttonName = "机构：";
                vm.bigAuditor = 2;
                getAuditorList();
            }else if(auditor == 2){
                vm.switchInstitute = { checked: true };
                vm.buttonName = "总部：";
                vm.bigAuditor = 1;
                //查询总部审核人
                vm.credentials1={
                    "leaveApplyId":vm.leaveApplyId
                };
                var proc = Restangular.all('reqBigAuditorList');
                proc.post(vm.credentials1).then(function(ret) {
                    if (ret.returnCode == "0") {
                        vm.auditorList = ret.listAuditor;
                        vm.auditorId = "";

                    }
                }, function() {

                });
            }


        }

        vm.otherAgreeApplyLeave = function(auditResult){
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入理由", "错误");
                    return;
                }
            }
            if(vm.auditorId == null || vm.auditorId == ''){
                toastr.error("审核人不能为空", "错误");
                return;
            }
            var account = auth.getObject("account");
            vm.credentials={
                "leaveApplyId":vm.leaveApplyId,
                "staffId":vm.staffId,
                "auditResult":auditResult,
                "sourceLeaveApplyId":vm.sourceLeaveApplyId,
                "auditOpinion":vm.auditOpinion,
                "userName":account.staffName,
                "auditId":vm.auditId,
                "auditorId":vm.auditorId,
                "groupName":account.groupName,
                "instituteName":account.instituteName
            };
            var proc = Restangular.all('reqLeaveOtherAgreeApply');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallLeaveListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });

        }
    }

})(this.angular);