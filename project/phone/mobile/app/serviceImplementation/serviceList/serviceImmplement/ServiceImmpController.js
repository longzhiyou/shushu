/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app',[])
        .controller('serviceImmpController', ServcieImmpController);
    /* @ngInject */
    function ServcieImmpController($ionicActionSheet,$cordovaGeolocation,$ionicPopup,$cordovaCamera,$cordovaBarcodeScanner,$rootScope,Restangular,toastr,$stateParams,auth,$state ,$ionicHistory,commonFuncService){

        var vm = this;
        vm.memberId=$stateParams.memberId;
        vm.careNo = $stateParams.careNo;
        vm.accessDiv =  $stateParams.accessDiv;
        vm.isLock=false;
        vm.dealNo=[];
        if ($stateParams.dealNo != null && $stateParams.dealNo != ''){
            vm.dealNo.push($stateParams.dealNo)
        }
        vm.state = "app.serviceList";

        vm.planDate = new Date();
        vm.serviceImm={};
        vm.credentials={
            "planDate":vm.planDate,
            "careNo":vm.careNo,
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
        vm.img1 = MobilePublic.getServerUrl('assets/img/home/care_photo.png');
        vm.img2 = MobilePublic.getServerUrl('assets/img/home/care_photo.png');
        vm.img3 = MobilePublic.getServerUrl('assets/img/home/care_photo.png');
        vm.photoData;
        vm.careOutPhotoList = [];
        vm.photoNo;
        vm.assess;
        vm.carePhotoData;
        vm.checkQrCode = "0";
        vm.lat = 0;
        vm.lng = 0;
        vm.subItem;
        var strDate = commonFuncService.formatDate("yyyyMMddhhmmssS",new Date());
        vm.careDetailNo = strDate + '001';
        getService();
        vm.serviceSubItem;
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
            var proc = Restangular.all('reqServiceImmService');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.serviceName = ret.serviceName;
                    vm.serviceId = ret.serviceId;
                    vm.serviceURL = ret.serviceURL;
                    vm.comment = ret.comment;
                    vm.careConfigList = ret.careConfigList;
                    vm.addComment = ret.addComment;
                    for (var i = 0 ; i<ret.careConfigList.length;i++){
                        vm.statuses.push(ret.careConfigList[i].care_disply_content);
                    }

                } else if (ret.returnCode == "1") {
                    vm.error = true;
                    vm.message=ret.message;
                } else if (ret.returnCode == "8") {
                    vm.error = true;
                    vm.message=ret.message;
                } else {
                    vm.error = true;
                    vm.message="系统异常";
                }
                vm.isLock = false;
            }, function() {
                vm.moredata = false;
                vm.isLock = false;
                vm.message="系统异常";
            });
        }
        //日期格式化
        function formatData(date){
            if (date.length >=8){
                var year = date.substr(0,4);
                var month = date.substr(4,2);
                var day = date.substr(6,2);
                return year + "-" + month + "-" + day;
            } else {
                return date;
            }
        }
        //迁移到手写板
        vm.toHandWrite = function(){
            vm.doImmall();
        }

        //服务实施
        vm.doImmall = function() {
            var careParamList=[];
            var careConfig = vm.careConfigList[vm.status];
            var immData ={
                "memberId":vm.memberId,
                "planDate":commonFuncService.formatDate("yyyyMMdd",vm.planDate),
                "careDate":vm.careDetailNo,
                "careNo":vm.careNo,
                "serviceId":vm.serviceId,
                "careItemId":careConfig.care_item_id,
                "careSubItemId":careConfig.care_sub_item_id,
                "careParaId":careConfig.care_para_id,
                "careValue":"",
                "comment":vm.memo
            }
            careParamList.push(immData);
            var account = auth.getObject("account");

            vm.serviceImm={
                "userId": account.userId,
                "staffId": account.staffId,
                "planDate":commonFuncService.formatDate("yyyyMMdd",vm.planDate),
                "access_div":vm.accessDiv,
                "staffName": account.staffName,
                "isFormatFile": "",
                "requestType": "100000",
                "careParamList":careParamList,
                "careInfoList":[]
            };

            var proc = Restangular.all('synCareClientServerHandle');
            proc.post(vm.serviceImm).then(function(ret) {
                vm.isLock=true;
                vm.error = false;
                if (ret.returnCode == "0") {
                    vm.moredata = true;
                    $rootScope.$emit("CallServiceMethod",{});

                    if (vm.dealNo != null && vm.dealNo.length >0) {
                        $state.go("app.pay", {
                            type: 1,
                            dealNo: vm.dealNo
                        });
                    } else {
                        $ionicHistory.goBack(-1);
                    }
                    /*var backview = $ionicHistory.backView();
                    var histories = $ionicHistory.viewHistory().views;
                    $ionicHistory.currentView(histories[backview.backViewId]);
                    //清空当前页的上一页的缓存
                    $ionicHistory.clearCache([backview.stateId]).then(function(){
                        //重定向url到上一页的url路径
                        var path = decodeURI(backview.url);
                        path = path + "?memberId="+vm.memberId+"&vm.accessDiv"
                        $location.url(path);
                    });*/
                }
                vm.isLock = false;
            }, function() {
                vm.moredata = false;

                vm.isLock = false;

            });
        };


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
                                popoverOptions: 0,
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
                    vm.moredata = true;
                    vm.img1 = MobilePublic.getServerUrl('assets/img/home/care_photo.png');
                    vm.img2 = MobilePublic.getServerUrl('assets/img/home/care_photo.png');
                    vm.img3 = MobilePublic.getServerUrl('assets/img/home/care_photo.png');
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
                    vm.img1 = MobilePublic.getServerUrl('assets/img/home/care_photo.png');
                    vm.img2 = MobilePublic.getServerUrl('assets/img/home/care_photo.png');
                    vm.img3 = MobilePublic.getServerUrl('assets/img/home/care_photo.png');
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

    }

})(this.angular);