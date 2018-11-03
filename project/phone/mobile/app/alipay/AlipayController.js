/**
 *
 * Created by yuejd on 2017-10-18.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('alipayController', AlipayController);
    /* @ngInject */
    function AlipayController($scope, $rootScope, Restangular,$stateParams,$ionicHistory,$state,toastr,auth,$cordovaInAppBrowser,$interval,$ionicPopup) {
        var vm = this;
        vm.id = $stateParams.id;
        vm.type = $stateParams.type;
        init();
        vm.timer=$interval(function(){
            vm.getStatues() ;
        },2000);
        function init(){
            vm.pay = true;
            vm.complete = false;
            vm.targetUrl = MobilePublic.Api + 'reqAliPay?id='+vm.id;
            vm.img1 = MobilePublic.getServerUrl('assets/img/home/payok.png',true);
        }
        vm.goBack = function(){
            if (vm.complete == true) {
                gotoBack();
                return ;
            }
            var confirmPopup = $ionicPopup.confirm({
                title: '确认',
                template: '还没有进行支付！继续进行将丢失此次订单，可以在已实施服务中进行支付，继续吗？'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    gotoBack();
                } else {
                    return;
                }
            });
        }
        function gotoBack(){
            if (vm.type  == 0) {
                $ionicHistory.goBack(-2);
            } else if (vm.type  == 1) {
                $ionicHistory.goBack(-3);
            } else {
                $ionicHistory.goBack(-4);
            }
            $rootScope.$emit("CallServiceSearchMethod");
            $interval.cancel(vm.timer);
        }
        vm.getStatues = function(){
            vm.credentials = {
                "id": vm.id,
            };
            var proc = Restangular.all('getWxPayReturn');
            proc.post(vm.credentials).then(function (ret) {
                if (ret.returnCode == "0") {
                    if (ret.statues == '2'){
                        vm.message = "支付完成";
                        vm.pay = false;
                        vm.complete = true;
                        $interval.cancel(vm.timer);
                    }
                    if (ret.statues == '9'){
                        vm.message = "支付失败";
                        vm.pay = false;
                        vm.complete = true;
                        $interval.cancel(vm.timer);
                    }
                }

            }, function () {

            });
        }
    }
    })(this.angular);