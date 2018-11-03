/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app',[])
        .controller('serviceAllSearchDetailController', ServiceAllSearchDetailController);
    /* @ngInject */
    function ServiceAllSearchDetailController(Restangular,$stateParams){

        var vm = this;

        init();

        function init(){
            vm.memberId=$stateParams.memberId;
            vm.careDetailNo = $stateParams.careDetailNo;
            vm.accessDiv =  $stateParams.accessDiv;
            vm.isLock=false;

            vm.state = "app.serviceList";

            vm.planDate = moment(new Date()).format("YYYY-MM-DD");
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
            vm.staffName;
            vm.status =0;
            vm.statuses = [];
            vm.memo;
            vm.careConfigList;
            vm.img1 = "";
            vm.img2 = "";
            vm.img3 = "";
            vm.photoData;
            vm.careOutPhotoList = [];
            vm.photoNo;
            vm.assess;
            vm.carePhotoData;
            vm.url="";
            vm.index = 1;
            vm.bigImage = false;
            vm.paymentModeList;
            vm.serviceAssessment;
            if (vm.accessDiv  == 1){
                vm.showSign = false;
            } else {
                vm.showSign = true;
            }
            vm.sign;
            vm.showPhoto = false;
            getService();

            //照相
            vm.options = {
                quality: 50,
                destinationType: 1,
                sourceType: 1,
                allowEdit: true,
                encodingType: 0,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: 0,
                saveToPhotoAlbum: true,
                correctOrientation:true
            };
        }
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
                    vm.careOutPhotoList = ret.careOutPhotoList;
                    vm.staffName = ret.staffName;
                    for (var i = 0;i<vm.careOutPhotoList.length;i++){
                        if ( i == 0){
                            vm.img1 = vm.careOutPhotoList[i].care_photo_url;
                            vm.showPhoto = true;
                        }
                        if ( i == 1){
                            vm.img2 = vm.careOutPhotoList[i].care_photo_url;
                            vm.showPhoto = true;
                        }
                        if ( i == 2){
                            vm.img3 = vm.careOutPhotoList[i].care_photo_url;
                            vm.showPhoto = true;
                        }
                    }
                    vm.showSignPhoto = true;
                    var evaluateList = ["不满意", "较满意", "满意", "非常满意"];
                    if (ret.serviceAssessment != null && ret.serviceAssessment!='') {
                        vm.serviceAssessment = evaluateList[Number(ret.serviceAssessment)-1];
                    } else {
                        vm.showSign = false;
                        vm.showSignPhoto = false;
                    }

                    vm.sign = ret.sign;
                    if (vm.sign == null){
                        vm.showSignPhoto = false;
                    }

                    vm.paymentModeList = ret.paymentModeList;
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
        vm.hideBigImage = function () {
            vm.bigImage = false;
        };
        //点击图片放大
        vm.shouBigImage = function (index) {  //传递一个参数（图片的URl）
            vm.index = index;
            showPhsoto();
        };
        vm.swipeLeft = function () {
            if (vm.index == 3){
                return;
            }
            vm.index++;
            if (vm.index > 2){
                vm.index = 2;
            }
            //替换url，展示图片
            showPhsoto();
        }
        vm.swipeRight = function () {
            if (vm.index == 3){
                return;
            }
            vm.index--;
            if (vm.index < 0){
                vm.index = 0;
            }
            showPhsoto();
        }

        function showPhsoto(){
            if (vm.index == 3){
                vm.url =vm.sign;
            } else {
                //替换url，展示图片
                vm.url = vm.careOutPhotoList[vm.index].care_photo_url2;
            }
            vm.bigImage = true;                //显示大图
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