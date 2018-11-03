/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('payModeController', PayModeController);
    /* @ngInject */
    function PayModeController($scope, $rootScope, Restangular,$stateParams,$ionicHistory,baseDataService,toastr) {
        var vm = this;
        vm.tfPaymentModeList = $stateParams.tfPaymentModeList;
        vm.index = $stateParams.index;
        vm.allSum = $stateParams.allSum;
        vm.accountSum = $stateParams.accountSum;
        vm.changePayMode = function(){
            if(vm.payMode == "99"){
                vm.amount = vm.accountSum;
                vm.readonly = true;
                vm.payFlagList = [{ value: '收费', key: '0' }];
                vm.payFlag = "0";
                if (vm.amount < 0 ){
                    vm.amount = 0 - vm.amount;
                }
            } else {
                vm.amount = vm.allSum;
                vm.readonly = false;
                vm.payFlagList = [{ value: '收费', key: '0' },
                    { value: '退款', key: '1' }];
                changePayFlg();
            }

        }
        init();

        function init(){
            vm.payFlagList = [{ value: '收费', key: '0' },
                { value: '退款', key: '1' }];
            vm.readonly = false;
            vm.baseData=baseDataService.get();
            if (vm.index == -1) {
                vm.amount = vm.allSum;
                vm.payMode = '01';
                vm.payFlag = '0';
            } else {
                vm.amount =  vm.tfPaymentModeList[vm.index].amount;
                vm.payMode = vm.tfPaymentModeList[vm.index].payMode;
                vm.payFlag = vm.tfPaymentModeList[vm.index].payFlag;
            }
            vm.changePayMode();

        }
        function getPayFlagText(key){
            for (var i=0;i<vm.payFlagList.length;i++){
                if (vm.payFlagList[i].key == key){
                    return vm.payFlagList[i].value;
                }
            }
        }
        function getPayModeText(key){
            for (var i=0;i<vm.baseData.paymentModeList.length;i++){
                if (vm.baseData.paymentModeList[i].key == key){
                    return vm.baseData.paymentModeList[i].value;
                }
            }
        }
        vm.confirm = function(){
            vm.amount = Number(vm.amount).toFixed(2);
            if (vm.amount <= 0){
                toastr.error("金额只能是正数");
                return;
            }
            if(vm.payMode == "99"){
                if(vm.amount > vm.accountSum){
                    toastr.error("账户只能支付"+vm.formatterMoney(vm.accountSum) +"元");
                    return;
                }
            }
            if (vm.payMode == '08' ){
                if (vm.payFlag == '1'){
                    toastr.error("支付宝只能付款");
                    return;
                }
            }
            if ( vm.payMode == '09' ){
                if (vm.payFlag == '1'){
                    toastr.error("微信只能付款");
                    return;
                }
            }
            var  id = 0;
            var aliwx = 0;
            if (vm.payMode == '08'){
                aliwx++;
            }
            if (vm.payMode == '09'){
                aliwx++;
            }
            if (vm.tfPaymentModeList.length > 0){
                for (var i = 0;i<vm.tfPaymentModeList.length;i++){
                    if (i == vm.index){
                        continue;
                    }
                    if (vm.tfPaymentModeList[i].payMode == '08'){
                        aliwx++;
                    }
                    if (vm.tfPaymentModeList[i].payMode == '09'){
                        aliwx++;
                    }
                    if (vm.payMode == vm.tfPaymentModeList[i].payMode){
                        toastr.error("相同的支付方式只能支付一次");
                        return;
                    }
                }
                if (aliwx > 1){
                    toastr.error("支付宝和微信支付只能选择其中一种支付");
                    return;
                }
                id = Number(vm.tfPaymentModeList[vm.tfPaymentModeList.length -1].id) +1;
            }
            var obj = {
                "id": id,
                "amount": vm.amount,
                "payMode": vm.payMode,
                "payFlag": vm.payFlag,
                "payFlagText":getPayFlagText(vm.payFlag),
                "payModeText":getPayModeText(vm.payMode),
                "prePayModeText": null,
                "prePayMode": null,
                "amount2": null,
                "amount3": null,
                "memo": null,
                "personName": null,
                "bedInfo": null,
                "buildName": null,
                "unitNumber": null,
                "floorNumber": null,
                "roomNumber": null,
                "fromDate": null,
                "toDate": null,
                "personId": null,
                "invoiceId": null
            }
            if (vm.index == -1) {
                vm.tfPaymentModeList.push(obj)
            } else {
                vm.tfPaymentModeList[vm.index].amount = vm.amount ;
                vm.tfPaymentModeList[vm.index].payMode = vm.payMode;
                vm.tfPaymentModeList[vm.index].payModeText = getPayModeText(vm.payMode);
                vm.tfPaymentModeList[vm.index].payFlag = vm.payFlag;
                vm.tfPaymentModeList[vm.index].payFlagText = getPayFlagText(vm.payFlag);
            }
            $rootScope.$emit("CallPayModeMethod", {"tfPaymentModeList":  vm.tfPaymentModeList});
            $ionicHistory.goBack(-1);
        }

        function changePayFlg(){
            if (vm.amount < 0 ){
                vm.amount = 0 - vm.amount;
                vm.payFlag = "1";
            }
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