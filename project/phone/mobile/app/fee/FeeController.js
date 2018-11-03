/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('feeController', FeeController);
    /* @ngInject */
    function FeeController($scope, $rootScope, Restangular,$stateParams,$ionicHistory,$state,toastr,auth) {
        var vm = this;
        vm.dealNo = $stateParams.dealNo;
        vm.type = $stateParams.type;
        init();

        function init(){
            /*$ionicHistory.nextViewOptions({
                disableBack: true
            });*/
            vm.tfPaymentModeList = [];
            vm.sum = 0;
            vm.accountList;
            vm.accountSum = 0;

            vm.headIconURL;
            vm.personName;
            vm.memo;
            vm.platformCharg = '0'
            vm.isLock = false;
            vm.data = {
                showDelete: false
            };
            vm.state = "app.payMode";
            /*$scope.$on('$ionicView.leave',
                function () {
                    if (vm.type  == 1) {
                        $rootScope.$emit("CallServiceHandWriteMethod", {});
                        $ionicHistory.goBack(-2);
                    } else {
                        $rootScope.$emit("CallServiceImmHandWriteMethod", {});
                        $ionicHistory.goBack(-3);
                    }
                });*/
            getData();
        }
        function getData(){
            vm.credentials={
                "dealNo":vm.dealNo
            };
            var proc = Restangular.all('reqfeeInfo');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    vm.accountList = ret.accountList;
                    if (vm.accountList != null) {
                        for (var i = 0 ; i < vm.accountList.length; i++){
                            if (vm.accountList[i].balance == null) {
                                vm.accountList[i].balance = 0;
                            }
                            if (vm.accountList[i].balance < vm.accountList[i].amount) {
                                vm.accountSum = vm.accountSum + vm.accountList[i].balance;
                            } else {
                                vm.accountSum = vm.accountSum + vm.accountList[i].amount;
                            }
                        }
                        vm.fromHandWrite = true;
                    }
                    vm.personName = ret.personName;
                    vm.tfDealList = ret.tfDealList;
                    vm.headIconURL = ret.headIconURL;
                    if (vm.headIconURL == null ||vm.headIconURL=='' ){
                        vm.headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png');
                    }
                    vm.sum = ret.sum;
                    if(vm.accountSum > vm.sum ){
                        vm.accountSum = vm.sum ;
                    }
                    vm.platformCharg = ret.platformCharg;
                }
            }, function() {
            });
        }

        //支付
        vm.doPayment = function() {
            var allsum = 0;
            var aliwx = null;
            for(var i = 0;i<vm.tfPaymentModeList.length;i++){
                if (vm.tfPaymentModeList[i].payFlag == '0') {
                    allsum = (Number(allsum) + Number(vm.tfPaymentModeList[i].amount)).toFixed(2);
                } else {
                    allsum = (Number(allsum) - Number(vm.tfPaymentModeList[i].amount)).toFixed(2);
                }
                if (vm.tfPaymentModeList[i].payMode == '08'){
                    aliwx = 1;
                }
                if (vm.tfPaymentModeList[i].payMode == '09'){
                    aliwx = 2;
                }
            }
            if (Number(vm.sum) != Number(allsum)){
                toastr.error("支付金额不等于总金额");
                return;
            }
            if ( vm.isLock ){
                return ;
            }
            var account = auth.getObject("account");
            for (var i = 0;i< vm.tfPaymentModeList.length;i++){
                vm.tfPaymentModeList[i].id = null;
            }
            if (vm.platformCharg == '0' || aliwx == null) {
                vm.credentials = {
                    "userId": account.userId,
                    "staffId": account.staffId,
                    "staffName": account.staffName,
                    "dealNo": vm.dealNo,
                    "tfPaymentModeList": vm.tfPaymentModeList,
                    "memo": vm.memo
                };
                var proc = Restangular.all('reqfeeCharge');
                proc.post(vm.credentials).then(function (ret) {
                    vm.isLock = true;
                    if (ret.returnCode == "0") {
                        vm.goBack();
                        $rootScope.$emit("CallServiceSearchMethod");
                    }

                }, function () {
                });
            } else {
                for(var i = 0;i<vm.tfPaymentModeList.length;i++){
                    if (vm.tfPaymentModeList[i].payFlag == '1') {
                        vm.tfPaymentModeList[i].amount = (0 - Number(vm.tfPaymentModeList[i].amount)).toFixed(2);
                    }

                }
                vm.credentials = {
                    "userId": account.userId,
                    "staffId": account.staffId,
                    "staffName": account.staffName,
                    "dealNo": vm.dealNo,
                    "tfPaymentModeList": vm.tfPaymentModeList,
                    "memo": vm.memo,
                    "aliWxFlg": aliwx
                };
                var proc = Restangular.all('reqPreOnlineFeeCharge');
                proc.post(vm.credentials).then(function (ret) {
                    vm.isLock = true;
                    if (ret.returnCode == "0") {
                        vm.pay = false;
                        var id= ret.id;
                        if (aliwx == 1) {
                            $state.go('app.alipay', {
                                id: id,
                                type:vm.type
                            });
                        } else {
                            $state.go('app.wxpay', {
                                id: id,
                                type:vm.type
                            });
                        }
                    }

                }, function () {
                });
            }
        };
        vm.goBack = function(){
            if (vm.type  == 0) {
                $ionicHistory.goBack(-1);
            } else if (vm.type  == 1) {
                $ionicHistory.goBack(-2);
            } else {
                $ionicHistory.goBack(-3);
            }
        }
        vm.onItemDelete = function(item) {
            var index = isExist(vm.tfPaymentModeList,item.id);
            vm.tfPaymentModeList = delData(vm.tfPaymentModeList,index);
        };
        function isExist(list,key){
            for (var i = 0;i<list.length;i++){
                if (list[i].id == key){
                    return i;
                }
            }
            return -1;
        }
        //list中删除数据
        function delData(list,n){
            return list.slice(0,n).concat(list.slice(n+1,list.length));
        }
        vm.change = function(){
           vm.data.showDelete = !vm.data.showDelete;
        }
        vm.gotoDetail = function(id){

            var index = -1;
            for (var i = 0;i< vm.tfPaymentModeList.length;i++){
                if (id == vm.tfPaymentModeList[i].id){
                    index = i;
                    break;
                }
            }

            var allsum = Number(vm.sum);
            for(var i = 0;i<vm.tfPaymentModeList.length;i++){
                if (index != i) {
                    if (vm.tfPaymentModeList[i].payFlag == '0') {
                        allsum = (Number(allsum) - Number(vm.tfPaymentModeList[i].amount)).toFixed(2);
                    } else {
                        allsum = (Number(allsum) + Number(vm.tfPaymentModeList[i].amount)).toFixed(2);
                    }
                }
            }
            var accountSum = Number(vm.accountSum);
            for(var i = 0;i<vm.tfPaymentModeList.length;i++){
                if (index != i) {
                    if (vm.tfPaymentModeList[i].payMode == '99') {
                        if (vm.tfPaymentModeList[i].payFlag == '0') {
                            accountSum = (Number(accountSum) - Number(vm.tfPaymentModeList[i].amount)).toFixed(2);
                        } else {
                            accountSum = (Number(accountSum) + Number(vm.tfPaymentModeList[i].amount)).toFixed(2);
                        }
                    }
                }
            }
            if (accountSum < 0 ){
                accountSum = 0;
            }
            $state.go(vm.state, {
                tfPaymentModeList: vm.tfPaymentModeList,
                index:index,
                allSum:allsum,
                accountSum:accountSum
            });
        }
        vm.gotoInfo = function(){
            $state.go("app.payDetail", {
                tfDealList: vm.tfDealList
            });
        }

        //支付方式回调
        $rootScope.$on("CallPayModeMethod",function(e,data){
            vm.tfPaymentModeList = data.tfPaymentModeList;
        });
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