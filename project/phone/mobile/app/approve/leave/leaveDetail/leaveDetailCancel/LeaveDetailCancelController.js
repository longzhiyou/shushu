/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('leaveDetailCancelController', LeaveDetailCancelController);
    /* @ngInject */
    function LeaveDetailCancelController($scope, $state, $rootScope, $ionicHistory,Restangular,$stateParams,toastr,auth){
        var vm = this;
        vm.leaveApplyId = $stateParams.leaveApplyId;
        vm.staffId = $stateParams.staffId;
        vm.auditId = $stateParams.auditId;
        vm.sourceLeaveApplyId = $stateParams.sourceLeaveApplyId;
        vm.leaveApplyType = $stateParams.leaveApplyType;
        vm.adjustList;
        vm.auditList;


        getLeaveDetailList();
        //取得老人一览
        function getLeaveDetailList() {
            var account = auth.getObject("account");
            vm.credentials={
                "leaveApplyId":vm.leaveApplyId,
                "staffId":vm.staffId,
                "auditId":vm.auditId,
                "sourceLeaveApplyId":vm.sourceLeaveApplyId,
                "leaveApplyType":vm.leaveApplyType,
                "sysStaffId":account.staffId
            };
            var proc = Restangular.all('reqLeaveDetailCancel');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {

                    vm.staffName = ret.staffName;
                    vm.register = ret.register;
                    vm.unit = ret.unit;
                    vm.countAuditLeave = ret.countAuditLeave;
                    vm.hasSourceLeaveApplyId = ret.hasSourceLeaveApplyId;
                    //取消前的请假明细
                    vm.adjustList = ret.adjustList;
                    if (vm.adjustList != null && vm.adjustList.length != 0 ){
                        for (var i = 0 ;i<vm.adjustList.length;i++){
                            var date = new Date(vm.adjustList[i].leaveStartDate);
                            vm.adjustList[i].leaveStartDateName =date.Format("yyyy-MM-dd hh:mm");
                            date = new Date(vm.adjustList[i].leaveEndDate);
                            vm.adjustList[i].leaveEndDateName =date.Format("yyyy-MM-dd hh:mm");
                        }
                    }
                    //调整前的审核明细
                    vm.auditList = ret.auditList;
                    if(vm.auditList != null && vm.auditList.length != 0){
                        for (var i = 0 ;i<vm.auditList.length;i++){
                            var date = new Date(vm.auditList[i].auditDate);
                            vm.auditList[i].auditDateName =date.Format("yyyy-MM-dd hh:mm");

                        }
                    }

                }
            }, function() {

            });
        }
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        vm.agreeApplyLeave = function(auditResult){
            $state.go("app.auditDetail", {
                type:12,
                auditResult:auditResult,
                inputParam:{
                    "leaveApplyId": vm.leaveApplyId,
                    "staffId": vm.staffId,
                    "auditId": vm.auditId,
                    "sourceLeaveApplyId": vm.sourceLeaveApplyId,
                    "leaveApplyType": vm.leaveApplyType
                }
            });

        }

        vm.otherAgreeApplyLeave = function(){
            $state.go("app.otherAgreeLeave", {
                leaveApplyId: vm.leaveApplyId,
                staffId: vm.staffId,
                auditId: vm.auditId,
                sourceLeaveApplyId: vm.sourceLeaveApplyId,
                leaveApplyType: vm.leaveApplyType
            });
        }

    }

})(this.angular);