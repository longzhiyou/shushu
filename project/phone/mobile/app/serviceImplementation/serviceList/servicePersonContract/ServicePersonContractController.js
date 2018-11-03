/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('servicePersonContractController',ServicePersonContractController);
    /* @ngInject */
    function ServicePersonContractController($scope,$cordovaGeolocation,$ionicPopup,$ionicPlatform,$cordovaBarcodeScanner,$rootScope,Restangular,$stateParams,auth,$state,toastr){

        var vm = this;
        vm.memberId = $stateParams.memberId;
        vm.headIconURL
        vm.state = "app.serviceImmp";
        vm.lat=0;
        vm.lng=0;

        vm.credentials={
            "memberId":vm.memberId
        };
        vm.showTel = false;
        vm.tel1;
        vm.tel2;
        vm.address;
        vm.show1 = false;
        vm.show2 = false;
        vm.show3 = false;
        //迁移到子画面
        vm.toMap = function(item){
            $state.go("app.personMap", {
                lat: vm.lat,
                lng: vm.lng,
                url:vm.headIconURL
            });
        }

        //取得服务一览
        function getPersonInfoList() {
            vm.data=[];

            var proc = Restangular.all('reqServicePersonInfo');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.personName = ret.personName;

                    vm.headIconURL = ret.headIconURL;
                    if (vm.headIconURL == null ||vm.headIconURL=='' ){
                        vm.headIconURL = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                    }
                    vm.tel1 = ret.tel1;
                    if(vm.tel1 != null && vm.tel1!=''){
                        vm.show1 = true;
                    }
                    vm.tel2 = ret.tel2;
                    if(vm.tel2 != null && vm.tel2!=''){
                        vm.show2 = true;
                    }
                    vm.address = ret.address;
                    vm.lng = ret.longitude;
                    vm.lat = ret.latitude;
                    if(vm.lng != null && vm.lng!=''&&vm.lat != null && vm.lat!=''){
                        vm.show3 = true;
                    }
                }

            }, function() {

            });
        }
        getPersonInfoList();

        vm.callTel= function(tel) {
            window.plugins.CallNumber.callNumber(function onSuccess(result){
                    console.log("Success:call number"+result);
                },
                function onError(result) {
                    console.log("Error:call number"+result);
                },
                tel,true);
        }
        vm.onHold= function(comment){
            var alertPopup = $ionicPopup.alert({
                title: '信息',
                template: comment
            });
            alertPopup.then(function(res) {

            });
        };
    }


})(this.angular);