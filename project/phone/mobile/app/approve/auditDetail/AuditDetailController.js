/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('auditDetailController', AuditDetailController);
    /* @ngInject */
    function AuditDetailController($scope, $rootScope,permissions, $ionicHistory,Restangular,$stateParams,toastr,auth,$ionicPopup){
        var vm = this;
        vm.auditResult = $stateParams.auditResult;
        vm.isAgree = false;
        vm.isRefuse = false;
        vm.type = $stateParams.type;
        vm.inputParam = $stateParams.inputParam;
        init();

        function init(){
            if(vm.auditResult == 1){
                vm.isAgree = true;
            }else {
                vm.isRefuse = true;
            }
        }

        vm.approve = function(auditResult){
            if (vm.type == 11) {
                leave(auditResult);
            } else if (vm.type == 12) {
                cancelLeave(auditResult);
            } else if (vm.type == 13) {
                ot(auditResult);
            } else if (vm.type == 14) {
                otCancel(auditResult);
            } else if (vm.type == 15) {
                wzPurchase(auditResult);
            } else if (vm.type == 16) {
                wzApply(auditResult);

            } else if (vm.type == 21) {
                inHospital(auditResult);
            } else if (vm.type == 22) {
                //退院审核
                checkOut(auditResult);
            } else if (vm.type == 23) {
            } else if (vm.type == 24) {
                bedAdjust(auditResult);
            } else if (vm.type == 25) {
                payment(auditResult);
            } else if (vm.type == 26) {
                serviceAdjust(auditResult);
            }


        }
        function leave(auditResult){
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入理由", "错误");
                    return;
                }
            }
            var account = auth.getObject("account");
            vm.credentials={
                "auditResult":auditResult,
                "auditOpinion":vm.auditOpinion,
                "userName":account.staffName,

                "leaveApplyId":vm.inputParam.leaveApplyId,
                "staffId":vm.inputParam.staffId,
                "sourceLeaveApplyId":vm.inputParam.sourceLeaveApplyId,
                "auditId":vm.inputParam.auditId,
                "leaveApplyType":vm.inputParam.leaveApplyType,
                "groupName":account.groupName,
                "instituteName":account.instituteName
            };
            var proc = Restangular.all('reqLeaveAgreeApply');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallLeaveListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }

        function cancelLeave(auditResult){
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入理由", "错误");
                    return;
                }
            }
            var account = auth.getObject("account");
            vm.credentials={
                "leaveApplyId":vm.inputParam.leaveApplyId,
                "staffId":vm.inputParam.staffId,
                "auditResult":auditResult,
                "sourceLeaveApplyId":vm.inputParam.sourceLeaveApplyId,
                "auditOpinion":vm.auditOpinion,
                "userName":account.staffName,
                "auditId":vm.inputParam.auditId,
                "leaveApplyType":vm.inputParam.leaveApplyType,
                "groupName":account.groupName,
                "instituteName":account.instituteName
            };
            var proc = Restangular.all('reqLeaveCancelAgreeApply');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallLeaveListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }

        function ot(auditResult){
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入理由", "错误");
                    return;
                }
            }
            var account = auth.getObject("account");
            vm.credentials={
                "otApplyId":vm.inputParam.otApplyId,
                "staffId":vm.inputParam.staffId,
                "auditResult":auditResult,
                "sourceOtApplyId":vm.inputParam.sourceOtApplyId,
                "auditOpinion":vm.auditOpinion,
                "userName":account.staffName,
                "auditId":vm.inputParam.auditId,
                "groupName":account.groupName,
                "instituteName":account.instituteName
            };
            var proc = Restangular.all('reqOtAgreeApply');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallOvertimeListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }

        function otCancel(auditResult){
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入理由", "错误");
                    return;
                }
            }
            var account = auth.getObject("account");
            vm.credentials={
                "otApplyId":vm.inputParam.otApplyId,
                "staffId":vm.inputParam.staffId,
                "auditResult":auditResult,
                "sourceOtApplyId":vm.inputParam.sourceOtApplyId,
                "auditOpinion":vm.auditOpinion,
                "userName":account.staffName,
                "auditId":vm.inputParam.auditId,
                "groupName":account.groupName,
                "instituteName":account.instituteName
            };
            var proc = Restangular.all('reqOtCancelAgreeApply');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallOvertimeListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }

        function wzPurchase(auditResult){
            var account = auth.getObject("account");
            vm.credentials={
                "staffId": account.staffId,
                "auditResult":auditResult,
                "auditOpinion":vm.auditOpinion,
                "purchaseId":vm.inputParam.purchaseId,
                "groupName":account.groupName,
                "instituteName":account.instituteName
            };
            if(auditResult == 1){ //同意
                var proc = Restangular.all('reqPurchaseAuditApply');
                proc.post(vm.credentials).then(function(ret) {
                    if (ret.returnCode == "0") {
                        $rootScope.$emit("CallPurchaseListMethod",{});
                        $rootScope.$emit("CallApproveListMethod",{});
                        $ionicHistory.goBack(-2);

                    }
                }, function() {

                });
            }else {
                var proc = Restangular.all('reqPurchaseRefuseApply');
                proc.post(vm.credentials).then(function(ret) {
                    if (ret.returnCode == "0") {
                        $rootScope.$emit("CallPurchaseListMethod",{});
                        $rootScope.$emit("CallApproveListMethod",{});
                        $ionicHistory.goBack(-2);

                    }
                }, function() {

                });
            }
        }

        function wzApply(auditResult){
            var account = auth.getObject("account");
            vm.credentials={
                "staffId": account.staffId,
                "auditResult":auditResult,
                "auditOpinion":vm.auditOpinion,
                "requisitionId":vm.inputParam.requisitionId,
                "groupName":account.groupName,
                "instituteName":account.instituteName
            };
            if(auditResult == 1){ //同意
                var proc = Restangular.all('reqApplyAgreeApply');
                proc.post(vm.credentials).then(function(ret) {
                    if (ret.returnCode == "0") {
                        $rootScope.$emit("CallApplyListMethod",{});
                        $rootScope.$emit("CallApproveListMethod",{});
                        $ionicHistory.goBack(-2);

                    }
                }, function() {

                });
            }else {
                var proc = Restangular.all('reqApplyRefuseApply');
                proc.post(vm.credentials).then(function(ret) {
                    if (ret.returnCode == "0") {
                        $rootScope.$emit("CallApplyListMethod",{});
                        $rootScope.$emit("CallApproveListMethod",{});
                        $ionicHistory.goBack(-2);

                    }
                }, function() {

                });
            }
        }
        function payment(auditResult){
            var req = "reqPaymentAdobt";
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入理由", "错误");
                    return;
                }
                req = "reqPaymentRefuse";
            } else {
                req = "reqPaymentAdobt";
            }
            var account = auth.getObject("account");
            vm.inputParam.memo = vm.auditOpinion;
            vm.inputParam.staffId = account.userId;
            vm.inputParam.staffName = account.staffName;
            vm.inputParam.groupName = account.groupName;
            vm.inputParam.instituteName = account.instituteName;
            var proc = Restangular.all(req);
            proc.post(vm.inputParam).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallPaymentListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }

        function bedAdjust(auditResult){
            var req = "reqPaymentAdobt";
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入理由", "错误");
                    return;
                }
                req = "reqPaymentRefuse";
            } else {
                req = "reqPaymentAdobt";
            }
            var account = auth.getObject("account");
            vm.inputParam.memo = vm.auditOpinion;
            vm.inputParam.staffId = account.userId;
            vm.inputParam.staffName = account.staffName;
            vm.inputParam.groupName = account.groupName;
            vm.inputParam.instituteName = account.instituteName;
            var proc = Restangular.all(req);
            proc.post(vm.inputParam).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallBedAdjustListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }

        function serviceAdjust(auditResult){
            var req = "reqPaymentAdobt";
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入理由", "错误");
                    return;
                }
                req = "reqPaymentRefuse";
            } else {
                req = "reqPaymentAdobt";
            }
            var account = auth.getObject("account");
            vm.inputParam.memo = vm.auditOpinion;
            vm.inputParam.staffId = account.userId;
            vm.inputParam.staffName = account.staffName;
            vm.inputParam.groupName = account.groupName;
            vm.inputParam.instituteName = account.instituteName;

            var proc = Restangular.all(req);
            proc.post(vm.inputParam).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallPaymentListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }

        function checkOut(auditResult){
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入理由", "错误");
                    return;
                }
            }
            var account = auth.getObject("account");
            vm.inputParam.memo = vm.auditOpinion;
            vm.inputParam.staffId = account.userId;
            vm.inputParam.staffName = account.staffName;
            vm.inputParam.groupName = account.groupName;
            vm.inputParam.instituteName = account.instituteName;
            vm.inputParam.auditResult = auditResult;

            var proc = Restangular.all("reqCheckOutAudit");
            proc.post(vm.inputParam).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallCheckOutListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }
        function inHospital(auditResult){
            if (auditResult != 1) {
                if (vm.auditOpinion == null || vm.auditOpinion == '') {
                    toastr.error("请输入审核意见", "错误");
                    return;
                }
            }
            if(auditResult == 0){
                showConfirm(auditResult);
            }else {
                agree(auditResult);
            }


        }

        function agree(auditResult){
            var account = auth.getObject("account");
            vm.inputParam.memo = vm.auditOpinion;
            vm.inputParam.staffId = account.userId;
            vm.inputParam.staffName = account.staffName;
            vm.inputParam.groupName = account.groupName;
            vm.inputParam.instituteName = account.instituteName;
            vm.inputParam.auditResult = auditResult;

            var proc = Restangular.all("reqGoInHospitalAudit");
            proc.post(vm.inputParam).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallGoInHospitalListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }

        function showConfirm(auditResult) {
            var confirmPopup = $ionicPopup.confirm({
                title: '确认',
                template: '如果是手续上的问题，请走线下流程。如果拒收，拒收后需要重走全部申请流程。您确定拒收吗？'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    refuse(auditResult);
                } else {
                    return;
                }
            });
        };

        function refuse(auditResult){
            var account = auth.getObject("account");
            vm.inputParam.memo = vm.auditOpinion;
            vm.inputParam.staffId = account.userId;
            vm.inputParam.staffName = account.staffName;
            vm.inputParam.groupName = account.groupName;
            vm.inputParam.instituteName = account.instituteName;
            vm.inputParam.auditResult = auditResult;

            var proc = Restangular.all("reqRefuseGoInHospitalAudit");
            proc.post(vm.inputParam).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallGoInHospitalListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-2);

                }
            }, function() {

            });
        }
    }

})(this.angular);