/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('purchaseDetailController', PurchaseDetailController);
    /* @ngInject */
    function PurchaseDetailController($scope, $state, $rootScope, $ionicHistory,Restangular,$stateParams,toastr,auth){
        var vm = this;
        vm.purchaseId = $stateParams.purchaseId;

        vm.list;

        vm.noData = true;

        getPurchaseDetailList();
        //取得老人一览
        function getPurchaseDetailList() {
            var account = auth.getObject("account");
            vm.credentials={
                "purchaseId":vm.purchaseId
            };
            var proc = Restangular.all('reqPurchaseDetail');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    //物资明细
                    vm.list = ret.listPurchaseDetail;
                    if(vm.list.length == 0){
                        vm.moneyTotal = 0.00;
                    }
                    var moneyTotal = 0;
                    for (var index = 0; index < vm.list.length; index++) {
                        moneyTotal += Number(vm.list[index].money);
                        vm.list[index].price = vm.list[index].price + "元";
                        vm.list[index].discountPrice = vm.list[index].discountPrice + "元";
                        vm.list[index].money = vm.list[index].money + "元";
                    }
                    vm.moneyTotal = vm.formatterMoney(moneyTotal);

                    vm.purchaseDepName = ret.purchaseDepName;
                    vm.orderOwnerName = ret.orderOwnerName;
                    var date = new Date(ret.orderDate);
                    vm.orderDate = date.Format("yyyy-MM-dd");
                    vm.orderMemo = ret.orderMemo;
                    vm.supplierId = ret.supplierId;
                    vm.listSupplier = ret.listSupplier;
                    vm.supplierName = ret.supplierName;

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
            $state.go("app.auditDetail", {
                type:15,
                auditResult:auditResult,
                inputParam:{
                    "purchaseId": vm.purchaseId
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