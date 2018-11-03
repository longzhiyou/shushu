/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('bedAdjustDetailController', BedAdjustDetailController);
    /* @ngInject */
    function BedAdjustDetailController(Restangular,$stateParams,auth,$state){
        var vm = this;
        vm.memberId = $stateParams.memberId;
        vm.applyId = $stateParams.applyId;
        vm.state = "app.serviceList";
        vm.list;

        getBedAdjustDetailList();
        //取得老人一览
        function getBedAdjustDetailList() {
            var account = auth.getObject("account");
            vm.credentials={
                "memberId":vm.memberId,
                "applyId":vm.applyId
            };
            var proc = Restangular.all('reqBedAdjustDetail');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    vm.personName = ret.personName;
                    vm.oldValue1 = ret.oldValue1;
                    vm.newValue1 = ret.newValue1;
                    vm.oldValue2 = ret.oldValue2;
                    vm.newValue2 = ret.newValue2;
                    if (vm.oldValue2 == "1") {
                        vm.oldCompartment = "(包房)";
                    } else if (vm.oldValue2 == "2") {
                        vm.oldCompartment = "(不收费)";
                    } else {
                        vm.oldCompartment = "(单床)";
                    }
                    if (vm.newValue2 == "1") {
                        vm.newCompartment = "(包房)";
                    } else if (vm.newValue2 == "2") {
                        vm.newCompartment = "(不收费)";
                    } else {
                        vm.newCompartment = "(单床)";
                    }
                    vm.bedExpense = ret.bedExpense;
                    var date = new Date(ret.applyDate);
                    vm.applyDate = date.Format("yyyy-MM-dd");
                    var date1 = new Date(ret.effectiveDate);
                    vm.effectiveDate = date1.Format("yyyy-MM-dd");
                    vm.reason = ret.reason;
                    vm.paymentPlanId = ret.paymentPlanId;
                    vm.personId = ret.personId;
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
        vm.agreeApply = function(auditResult){
            var inputParam= {
                "paymentPlanId": vm.paymentPlanId,
                "personId" : vm.personId,
                "memberId" : vm.memberId,
                "applyId" : vm.applyId,
                "memo" :"",
                "processDiv" : "1",
                "oldValue1" :vm.oldValue1
            }
            $state.go("app.auditDetail", {
                type: 24,
                inputParam: inputParam,
                auditResult:auditResult
            });
        }
        vm.toPaymentInfo = function(){
            $state.go("app.paymentInfo", {
                paymentPlanId:vm.paymentPlanId,
                personId:vm.personId
            });
        }
    }

})(this.angular);