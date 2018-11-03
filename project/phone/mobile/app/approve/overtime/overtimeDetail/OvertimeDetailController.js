/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('overtimeDetailController', OvertimeDetailController);
    /* @ngInject */
    function OvertimeDetailController($scope, $rootScope, $ionicHistory,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.otApplyId = $stateParams.otApplyId;
        vm.staffId = $stateParams.staffId;
        vm.auditId = $stateParams.auditId;
        vm.sourceOtApplyId = $stateParams.sourceOtApplyId;
        vm.otApplyType = $stateParams.otApplyType;


        getOtDetailList();
        //取得老人一览
        function getOtDetailList() {
            var account = auth.getObject("account");
            vm.credentials={
                "otApplyId":vm.otApplyId,
                "staffId":vm.staffId,
                "auditId":vm.auditId,
                "sourceOtApplyId":vm.sourceOtApplyId,
                "otApplyType":vm.otApplyType
            };
            var proc = Restangular.all('reqOvertimeDetail');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    //加班详细
                    vm.staffName = ret.staffName;
                    vm.register = ret.register;
                    var date = new Date(ret.otStart);
                    vm.otStartName = date.Format("yyyy-MM-dd hh:mm");
                    date = new Date(ret.otEnd);
                    vm.otEndName = date.Format("yyyy-MM-dd hh:mm");
                    vm.otTime = vm.formatterMoney(ret.otTime);
                    vm.otPeriod = vm.otStartName +" - "+ vm.otEndName;
                    vm.unit = ret.unit;
                    vm.memo = ret.memo;
                    vm.countAuditLeave = ret.countAuditLeave;

                    vm.staffOtModifyName = ret.staffOtModifyName;
                    vm.registerModify = ret.registerModify;
                    vm.otTimeModify = vm.formatterMoney(ret.otTimeModify);
                    date = new Date(ret.otStartModify);
                    vm.otStartModifyName = date.Format("yyyy-MM-dd hh:mm");
                    date = new Date(ret.otEndModify);
                    vm.otEndModifyName = date.Format("yyyy-MM-dd hh:mm");
                    vm.otPeriodModify = vm.otStartModifyName +" - "+ vm.otEndModifyName;
                    vm.otApplyMemoModify = ret.otApplyMemoModify;

                    vm.auditName = ret.auditName;
                    vm.auditResult = ret.auditResult;
                    vm.auditDate = ret.auditDate;
                    vm.auditModifyOpinion = ret.auditModifyOpinion;

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
        vm.agreeApplyOt = function(auditResult){


            $state.go("app.auditDetail", {
                type:13,
                auditResult:auditResult,
                inputParam:{
                    "otApplyId": vm.otApplyId,
                    "staffId": vm.staffId,
                    "auditId": vm.auditId,
                    "sourceOtApplyId": vm.sourceOtApplyId
                }
            });

        }

        // 格式化业务金额
        vm.formatterMoney = function(value) {
            var number = value+"";
            number = number.replace(/,/g, "");
            if(isNaN(number) || number == "")return "";
            number = Math.round(number * 100) / 100;
            if (number < 0)
                return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
            else
                return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
        }
        function outputdollars(number) {
            if (number.length <= 3)
                return (number == '' ? '0' : number);
            else {
                var mod = number.length % 3;
                var output = (mod == 0 ? '' : (number.substring(0, mod)));
                for (var i = 0; i < Math.floor(number.length / 3); i++) {
                    if ((mod == 0) && (i == 0))
                        output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                    else
                        output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
                }
                return (output);
            }
        }
        //格式化金额
        function outputcents(amount) {
            amount = Math.round(((amount) - Math.floor(amount)) * 100);
            return (amount < 10 ? '.0' + amount : '.' + amount);
        }
    }

})(this.angular);