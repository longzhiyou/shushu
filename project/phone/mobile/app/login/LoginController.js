/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('loginController', LoginController);
    /* @ngInject */
    function LoginController($scope,$state,auth,baseDataService,$cordovaBarcodeScanner){

        var vm = this;


        vm.bleList=[];
        vm.bleMap={};
        vm.login = login;
        vm.error = false;
        vm.credentials={
            "userId":"",
            "password":"",
            "systemTime":"",
            "deviceToken":"",
            "divceType":"1",
            "version":"1",
            "ipAddress":"192.168.1.109",
            "processId":"123456",
            "channelId":"123456",
            "systemVer":"123456"
        };
        function login() {


             auth.authenticate(vm.credentials, function(authenticated) {
             	if (authenticated) {
             		// console.log("Login succeeded");

             		// vm.error = false;
                    baseDataService.init();
                    $state.go('app.home');
             	} else {
             		// console.log("Login failed");
             		// vm.error = true;
             	}
             });


        }

        function remove(user) {
            console.info(user);
        }


        function go() {
            $state.go('users');

        }


        // vm.scanBarcode=function () {
        //     $cordovaBarcodeScanner
        //         .scan()
        //         .then(function(barcodeData) {
        //             // Success! Barcode data is here 扫描数据：barcodeData.text
        //             alert(barcodeData);
        //
        //         }, function(error) {
        //             alert('失败')
        //
        //         });
        // };
        // vm.startScan = startScan;
        // vm.stopScan = stopScan;
        // vm.isEnabled=isEnabled;
        // vm.connect=connect;
        //
        // vm.onConnected=function () {
        //     console.log("Bluetooth onConnected");
        //     $scope.$apply(function(){
        //         vm.bleData = "连接设备成功";
        //
        //     });
        // };
        //
        // vm.onError=function () {
        //     console.log("Bluetooth onError");
        //     $scope.$apply(function(){
        //         vm.bleData = "连接设备onError";
        //
        //     });
        // };
        //
        // vm.bleCallback = bleCallback;
        // function bleCallback(device) {
        //     vm.credentials.userId="蓝牙返回"+JSON.stringify(device);
        // }
        //
        // vm.con=true;
        // vm.connectSatae=function () {
        //     vm.con=true;
        // };
        // vm.disconnectSatae=function () {
        //     vm.con=false;
        // };
        //
        // function connect(device) {
        //
        //     if (vm.con) {
        //         //当前连接
        //         ble.connect(device.id, function (peripheral) {
        //             console.log("Bluetooth onConnected");
        //             $scope.$apply(function(){
        //                 vm.bleData = device.id+"连接设备成功"+JSON.stringify(peripheral);
        //             });
        //         }, function () {
        //             $scope.$apply(function(){
        //                 vm.bleData = device.id+"连接设备失败";
        //             });
        //         });
        //     }else {
        //         ble.disconnect(device.id, function () {
        //             console.log("Bluetooth onConnected");
        //             $scope.$apply(function(){
        //                 vm.bleData = device.id+"设备断开连接成功";
        //             });
        //         }, function () {
        //             $scope.$apply(function(){
        //                 vm.bleData = device.id+"设备断开连接失败";
        //             });
        //         });
        //     }
        //
        // }
        //
        // function isEnabled() {
        //     ble.isEnabled(
        //         function() {
        //             console.log("Bluetooth is enabled");
        //             vm.bleData = "Bluetooth is enabled"
        //         },
        //         function() {
        //             console.log("Bluetooth is *not* enabled");
        //             vm.bleData = "Bluetooth is *not* enabled"
        //         }
        //     );
        //
        // }
        //
        //
        // function startScan() {
        //
        //     ble.startScan([], function(device) {
        //         if (device.name&& !vm.bleMap.hasOwnProperty(device.name)) {
        //             $scope.$apply(function(){
        //                 vm.bleMap[device.name] = device;
        //                 vm.bleList.push(device);
        //             });
        //
        //         }
        //         console.log("扫描返回"+JSON.stringify(device));
        //
        //     });
        //
        //
        // }
        //
        // function stopScan() {
        //
        //     setTimeout(ble.stopScan,
        //         5000,
        //         function() { console.log("Scan complete"); },
        //         function() { console.log("stopScan failed"); }
        //     );
        //
        //
        // }

    }

})(this.angular);