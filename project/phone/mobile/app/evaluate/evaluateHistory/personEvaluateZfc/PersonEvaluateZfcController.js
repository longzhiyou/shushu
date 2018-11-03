/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('personEvaluateZfcController', PersonEvaluateZfcController);
    /* @ngInject */
    function PersonEvaluateZfcController($scope, $rootScope,$ionicHistory, Restangular,$stateParams,$state,auth,$ionicPopup,toastr){
        var vm = this;
        vm.menus = [];
        vm.evaluateType = $stateParams.accessDiv;
        vm.personId = $stateParams.personId;
        vm.applyId = $stateParams.applyId;
        vm.evaluationRecordId = $stateParams.id;
        vm.personName;
        vm.data1=[];
        vm.data2=[];
        vm.data3=[];
        vm.data4=[];
        vm.credentials;
        vm.comment = "";
        vm.headIcon = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
        var obj = {title:"日常生活活动",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"F",itemCount:"10"};
        vm.menus.push(obj);

        obj = {title:"精神状态",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"G",itemCount:"3"};
        vm.menus.push(obj);

        obj = {title:"感知觉与沟通",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"H",itemCount:"4"};
        vm.menus.push(obj);

        obj = {title:"社会参与",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"I",itemCount:"5"};
        vm.menus.push(obj);
        vm.credentials={
            "personId":vm.personId,
            "evaluationRecordId":vm.evaluationRecordId
        };
        getPersonInfo();
        function getPersonInfo() {
            if (vm.personId == ''){
                return;
            }
            vm.message = "";
            var proc = Restangular.all('reqEvaluateData');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;
                if (ret.returnCode == "0") {
                    vm.personName=ret.personName;
                    if (ret.photoFile != undefined) {
                        vm.headIcon = ret.photoFile;
                    }
                    var estimateInfo = ret.estimateInfo;
                    vm.comment = ret.comment;
                    for (var i = 0;i<estimateInfo.length;i++){
                        if (estimateInfo[i].itemType.substr(0,1) == "F"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data1.push(key);
                            vm.menus[0].itemCount = vm.menus[0].itemCount -1;
                        }
                        if (estimateInfo[i].itemType.substr(0,1) == "G"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data2.push(key);
                            vm.menus[1].itemCount = vm.menus[1].itemCount -1;
                        }
                        if (estimateInfo[i].itemType.substr(0,1) == "H"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data3.push(key);
                            vm.menus[2].itemCount = vm.menus[2].itemCount -1;
                        }
                        if (estimateInfo[i].itemType.substr(0,1) == "I"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data4.push(key);
                            vm.menus[3].itemCount = vm.menus[3].itemCount -1;
                        }
                    }

                }

            }, function() {


            });
        }
        //迁移到子画面
        vm.toDetail = function(item){
            var data = [];
            if (item.itemType == "F"){
                data = vm.data1;
            }
            if (item.itemType == "G"){
                data = vm.data2;
            }
            if (item.itemType == "H"){
                data = vm.data3;
            }
            if (item.itemType == "I"){
                data = vm.data4;
            }

            var map = [];
            for (var i = 0;i<data.length;i++){
                map.push(data[i]);
            }
            $state.go("app.evaluateDetailZfc", {
                itemType: item.itemType,
                evaluateType: vm.evaluateType,
                data: map
            });

        }

        vm.save = function(){
            if (vm.data1.length==0){
                toastr.error("日常生活活动还没有评估", "错误");
                return;
            }
            if (vm.data2.length==0){
                toastr.error("精神状态还没有评估", "错误");
                return;
            }
            if (vm.data3.length==0){
                toastr.error("感知觉与沟通还没有评估", "错误");
                return;
            }
            if (vm.data4.length==0){
                toastr.error("社会参与还没有评估", "错误");
                return;
            }
            var count = 0;
            for (var i = 0;i<vm.menus.length;i++){
                count = count + vm.menus[i].itemCount;
            }

            if (count > 0){
                showConfirm();
            } else {
                doSave();
            }
        };
        function doSave(){
            vm.message="";
            var account = auth.getObject("account")

            var estimateInfo=[];

            for (var i=0;i<vm.data1.length;i++){
                var data = vm.data1[i].split("-");
                var obj = {
                    itemType:data[0],
                    itemNo:data[1],
                }
                estimateInfo.push(obj);
            }
            for (var i=0;i<vm.data2.length;i++){
                var data = vm.data2[i].split("-");
                var obj = {
                    itemType:data[0],
                    itemNo:data[1],
                }
                estimateInfo.push(obj);
            }
            for (var i=0;i<vm.data3.length;i++){
                var data = vm.data3[i].split("-");
                var obj = {
                    itemType:data[0],
                    itemNo:data[1],
                }
                estimateInfo.push(obj);
            }
            for (var i=0;i<vm.data4.length;i++){
                var data = vm.data4[i].split("-");
                var obj = {
                    itemType:data[0],
                    itemNo:data[1],
                }
                estimateInfo.push(obj);
            }
            if (vm.applyId == -1) {
                vm.credentials = {
                    "staffId": account.userId,
                    "personId": vm.personId,
                    "personName": "",
                    "confirmDate": "",
                    "recorder": account.staffName,
                    "comment": vm.comment,
                    "totalScore": 0,
                    "page1Score": 0,
                    "page2Score": 0,
                    "evaluateRecordId": vm.evaluationRecordId,
                    "estimateInfo": estimateInfo
                };
                var proc = Restangular.all('reqEvaluateRegist');
                proc.post(vm.credentials).then(function (ret) {

                    if (ret.returnCode == "0") {
                        $rootScope.$emit("CallEvaluateMethod", {});
                        $rootScope.$emit("CallEvaluateHistoryMethod", {});
                        $ionicHistory.goBack(-1);
                    }

                }, function () {

                });
            } else {
                vm.credentials = {
                    "staffId": account.userId,
                    "personId": vm.personId,
                    "personName": "",
                    "confirmDate": "",
                    "recorder": account.staffName,
                    "comment": vm.comment,
                    "totalScore": 0,
                    "page1Score": 0,
                    "page2Score": 0,
                    "evaluateRecordId": vm.evaluationRecordId,
                    "estimateInfo": estimateInfo,
                    "applyId":vm.applyId
                };
                var proc = Restangular.all('reqEvaluateRegistRcy');
                proc.post(vm.credentials).then(function (ret) {

                    if (ret.returnCode == "0") {
                        $rootScope.$emit("CallEvaluateMethod", {});
                        $rootScope.$emit("CallEvaluateHistoryMethod", {});
                        $ionicHistory.goBack(-1);
                    }

                }, function () {

                });
            }
        }
        //评估回调
        $rootScope.$on("CallEvaluateStdMethod",function(e,data){
            if (data.itemType == "F"){
                vm.data1 = data.data;
                vm.menus[0].itemCount = 10 - data.data.length;
            }
            if (data.itemType == "G"){
                vm.data2 = data.data;
                vm.menus[1].itemCount = 3 - data.data.length;
            }
            if (data.itemType == "H"){
                vm.data3 = data.data;
                vm.menus[2].itemCount = 4 - data.data.length;
            }
            if (data.itemType == "I"){
                vm.data4 = data.data;
                vm.menus[3].itemCount = 5 - data.data.length;
            }
        });
        function showConfirm() {
            var confirmPopup = $ionicPopup.confirm({
                title: '确认',
                template: '评估还没有完成？要继续吗'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    doSave();
                } else {
                    return;
                }
            });
        };


    }

})(this.angular);