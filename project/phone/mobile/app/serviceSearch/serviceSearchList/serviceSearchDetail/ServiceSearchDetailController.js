/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app',[])
        .controller('serviceSearchDetailController', ServiceSearchDetailController);
    /* @ngInject */
    function ServiceSearchDetailController($scope,$ionicActionSheet,$cordovaGeolocation,$ionicPopup,$ionicPlatform,$cordovaCamera,$cordovaBarcodeScanner,$rootScope,setting,Restangular,$stateParams,auth,$state ,$ionicHistory,$location,toastr){

        var vm = this;
        vm.memberId=$stateParams.memberId;
        vm.careDetailNo = $stateParams.careDetailNo;
        vm.accessDiv =  $stateParams.accessDiv;
        vm.isLock=false;
        vm.dealNo=[];
        vm.showPayButton = false;

        vm.state = "app.serviceList";

        vm.planDate = $stateParams.planDate;
        vm.serviceImm={};
        vm.credentials={
            "planDate":vm.planDate,
            "careDetailNo":vm.careDetailNo,
            "memberId":vm.memberId
        };
        vm.serviceName;
        vm.serviceId;
        vm.serviceURL;
        vm.comment;
        vm.status =0;
        vm.statuses = [];
        vm.memo;
        vm.careConfigList;
        vm.img1 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
        vm.img2 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
        vm.img3 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
        vm.photoData;
        vm.careOutPhotoList = [];
        vm.photoNo;
        vm.assess;
        vm.carePhotoData;
        vm.serviceAssessment;
        vm.paymentModeList;
        vm.sign;
        vm.statuses = [];
        getService();

        //照相
        vm.options = {
                quality: 100,
                destinationType: 1,
                sourceType: 1,
                allowEdit: true,
                encodingType: 0,
                targetWidth: 500,
                targetHeight: 500,
                popoverOptions: 0,
                saveToPhotoAlbum: true,
                correctOrientation:true
            };

            function openCamera(){
                $cordovaCamera.getPicture(vm.options).then(function(imageData) {
                    var image = document.getElementById('img1');
                    //image.src = "data:image/jpeg;base64," + imageData;
                    vm.photoData = imageData;
                    uoloadPhoto();
                }, function(err) {
                    // error
                });

            }

        //取得服务详情
        function getService() {
            var proc = Restangular.all('reqServiceSearchService');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.serviceName = ret.serviceName;
                    vm.careDate = ret.careDate;
                    vm.careNo = ret.careNo;
                    vm.careDisplyContent = ret.careDisplyContent;

                    vm.serviceId = ret.serviceId;
                    vm.serviceURL = ret.serviceURL;
                    vm.memo = ret.memo;
                    vm.comment = ret.comment;
                    vm.addComment = ret.addComment;
                    vm.img1 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
                    vm.img2 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
                    vm.img3 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
                    vm.careOutPhotoList = ret.careOutPhotoList;
                    vm.careConfigList = ret.careConfigList;

                    vm.status = ret.careParaId;

                    for (var i = 0;i<vm.careOutPhotoList.length;i++){
                        if ( i == 0){
                            vm.img1 = vm.careOutPhotoList[i].care_photo_url;
                        }
                        if ( i == 1){
                            vm.img2 = vm.careOutPhotoList[i].care_photo_url;
                        }
                        if ( i == 2){
                            vm.img3 = vm.careOutPhotoList[i].care_photo_url;
                        }
                    }

                }
                vm.isLock = false;
            }, function() {
                vm.moredata = false;
                vm.isLock = false;
            });
        }


        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        // 拍照菜单
        vm.show = function(idx) {
            if (idx  < vm.careOutPhotoList.length) {
                var delData = vm.careOutPhotoList[idx];
                vm.photoNo = delData.photo_no;
                // 显示操作表
                $ionicActionSheet.show({
                    buttons: [
                        {text: '删除'},
                        {text: '取消'},
                    ],
                    cancelText: 'Cancel',
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        if (index == 0) {
                            delPhoto(idx);
                        }
                        return true;
                    }

                });
            } else {

                // 显示操作表
                $ionicActionSheet.show({
                    buttons: [
                        {text: '拍照'},
                        {text: '从相册选择'},
                        {text: '取消'},
                    ],
                    cancelText: 'Cancel',
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        if (index == 0) {
                            vm.options = {
                                quality: 100,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: Camera.PictureSourceType.CAMERA,
                                allowEdit: true,
                                encodingType: 0,
                                targetWidth: 500,
                                targetHeight: 500,
                                popoverOptions: CameraPopoverOptions,
                                saveToPhotoAlbum: true,
                                correctOrientation: true
                            };
                            openCamera();
                        }
                        if (index == 1) {
                            vm.options = {
                                quality: 100,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                allowEdit: true,
                                encodingType: 0,
                                targetWidth: 500,
                                targetHeight: 500,
                                popoverOptions: CameraPopoverOptions,
                                saveToPhotoAlbum: false,
                                correctOrientation: true
                            };
                            openCamera();
                        }
                        return true;
                    }
                });
            }
        }

        //上传图片
        function uoloadPhoto() {
            var account = auth.getObject("account");
            vm.message="";
            var delPhoto={
                "userId": account.userId,
                "staffId": account.staffId,
                "staffName": account.staffName,
                "careNo":vm.careNo,
                "careDetailNo":vm.careDetailNo,
                "photoNo": "",
                "careDate": "",
                "carePhotoData":vm.photoData,
                "carePhotoUrl":"",
                "type":"1"
            };

            var proc = Restangular.all('reqServiceImmUpPhoto');
            proc.post(delPhoto).then(function(ret) {
                vm.message="";
                vm.isLock=true;
                vm.error = false;
                if (ret.returnCode == "0") {
                    vm.img1 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
                    vm.img2 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
                    vm.img3 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
                    vm.careOutPhotoList = ret.careOutPhotoList;
                    for (var i = 0;i<vm.careOutPhotoList.length;i++){
                        if ( i == 0){
                            vm.img1 = vm.careOutPhotoList[i].care_photo_url;
                        }
                        if ( i == 1){
                            vm.img2 = vm.careOutPhotoList[i].care_photo_url;
                        }
                        if ( i == 2){
                            vm.img3 = vm.careOutPhotoList[i].care_photo_url;
                        }
                    }
                 }
                vm.isLock = false;

            }, function() {
                vm.isLock = false;

            });
        }

        //删除图片
        function delPhoto(index) {
            var account = auth.getObject("account");
            var upPhoto={
                "userId": account.userId,
                "staffId": account.staffId,
                "staffName": account.staffName,
                "careNo":vm.careNo,
                "careDetailNo":vm.careDetailNo,
                "photoNo": vm.photoNo,
                "careDate": "",
                "carePhotoData":"",
                "carePhotoUrl":"",
                "type":"2"
            };

            var proc = Restangular.all('reqServiceImmUpPhoto');
            proc.post(upPhoto).then(function(ret) {
                vm.message="";
                vm.isLock=true;
                vm.error = false;
                if (ret.returnCode == "0") {
                    vm.moredata = true;
                    vm.img1 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
                    vm.img2 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
                    vm.img3 = MobilePublic.getServerUrl('assets/img/home/care_photo.png',true);
                    vm.careOutPhotoList = ret.careOutPhotoList;
                    for (var i = 0;i<vm.careOutPhotoList.length;i++){
                        if ( i == 0){
                            vm.img1 = vm.careOutPhotoList[i].care_photo_url;
                        }
                        if ( i == 1){
                            vm.img2 = vm.careOutPhotoList[i].care_photo_url;
                        }
                        if ( i == 2){
                            vm.img3 = vm.careOutPhotoList[i].care_photo_url;
                        }
                    }
                }

                vm.isLock = false;
            }, function() {
                vm.isLock = false;

            });
        }
        vm.save = function(){
            var immData ={
                "memberId":vm.memberId,
                "careDetailNo":vm.careDetailNo,
                "careParaId":vm.status,
                "comment":vm.memo
            }
            var proc = Restangular.all('reqServiceImm');
            proc.post(immData).then(function(ret) {
                vm.isLock=true;
                vm.error = false;
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallServiceSearchMethod",{});
                    $ionicHistory.goBack(-1);
                }
            }, function() {
            });
        }
        vm.toPay = function(){
            if (vm.dealNo != null && vm.dealNo.length >0) {
                $state.go("app.pay", {
                    type: 1,
                    dealNo: vm.dealNo
                });
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