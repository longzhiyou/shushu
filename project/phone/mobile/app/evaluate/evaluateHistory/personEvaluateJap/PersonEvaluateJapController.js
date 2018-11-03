/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('personEvaluateJapController', PersonEvaluateJapController);
    /* @ngInject */
    function PersonEvaluateJapController($scope,$rootScope,$ionicHistory, Restangular,$stateParams,$state,auth,$ionicPopup,toastr){
        var vm = this;
        vm.menus = [];
        vm.evaluateType = $stateParams.accessDiv;
        vm.personId = $stateParams.personId;
        vm.evaluationRecordId = $stateParams.id;
        vm.applyId = $stateParams.applyId;
        vm.personName;
        vm.data1=[];
        vm.data2=[];
        vm.data3=[];
        vm.data4=[];
        vm.data5=[];
        vm.data6=[];
        vm.credentials;
        vm.comment = "";
        vm.headIcon = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
        var obj = {title:"身体机能",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"H1",itemCount:"13"};
        vm.menus.push(obj);

        obj = {title:"生活机能",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"H2",itemCount:"12"};
        vm.menus.push(obj);

        obj = {title:"认知机能",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"H3",itemCount:"9"};
        vm.menus.push(obj);

        obj = {title:"精神*行动",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"H4",itemCount:"15"};
        vm.menus.push(obj);

        obj = {title:"社会适应",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"H5",itemCount:"6"};
        vm.menus.push(obj);
        vm.credentials={
            "personId":vm.personId,
            "evaluationRecordId":vm.evaluationRecordId
        };
        getPersonInfo();
        function getPersonInfo() {
            vm.message = "";
            var proc = Restangular.all('reqEvaluateData');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;
                if (ret.returnCode == "0") {
                    vm.personName=ret.personName;
                    if (ret.photoFile != undefined) {
                        vm.headIcon = ret.photoFile;
                    }
                    vm.comment = ret.comment;
                    var estimateInfo = ret.estimateInfo;
                    var h11Count = 0;
                    var h12Count = 0;

                    for (var i = 0;i<estimateInfo.length;i++){
                        if (estimateInfo[i].itemType.substr(0,2) == "H1"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data1.push(key);
                            vm.menus[0].itemCount = vm.menus[0].itemCount -1;
                            if (estimateInfo[i].itemType == "H11"){
                                h11Count++;
                            }
                            if (estimateInfo[i].itemType == "H12"){
                                h12Count++;
                            }
                        }
                        if (estimateInfo[i].itemType.substr(0,2) == "H2"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data2.push(key);
                            vm.menus[1].itemCount = vm.menus[1].itemCount -1;
                        }
                        if (estimateInfo[i].itemType.substr(0,2) == "H3"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data3.push(key);
                            vm.menus[2].itemCount = vm.menus[2].itemCount -1;
                        }
                        if (estimateInfo[i].itemType.substr(0,2) == "H4"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data4.push(key);
                            vm.menus[3].itemCount = vm.menus[3].itemCount -1;
                        }
                        if (estimateInfo[i].itemType.substr(0,2) == "H5"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data5.push(key);
                            vm.menus[4].itemCount = vm.menus[4].itemCount -1;
                        }
                        if (estimateInfo[i].itemType.substr(0,2) == "H6"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data6.push(key);
                        }
                    }
                    if (h11Count >=1){
                        vm.menus[0].itemCount = vm.menus[0].itemCount + h11Count - 1;
                    }
                    if (h12Count >=1){
                        vm.menus[0].itemCount = vm.menus[0].itemCount + h12Count - 1;
                    }
                }

            }, function() {

            });
        }
        //迁移到子画面
        vm.toDetail = function(item){
            var data = vm.data1;
            if (item.itemType == "H1"){
                data = vm.data1;
            }
            if (item.itemType == "H2"){
                data = vm.data2;
            }
            if (item.itemType == "H3"){
                data = vm.data3;
            }
            if (item.itemType == "H4"){
                data = vm.data4;
            }
            if (item.itemType == "H5"){
                data = vm.data5;
            }
            if (item == "H6") {
                data = vm.data6;
            }
            var map = [];
            for (var i = 0;i<data.length;i++){
                map.push(data[i]);
            }
            if (item == "H6"){
                $state.go("app.evaluateDetailJap", {
                    itemType: "H6",
                    evaluateType: vm.evaluateType,
                    data: map
                });
            } else {
                $state.go("app.evaluateDetailJap", {
                    itemType: item.itemType,
                    evaluateType: vm.evaluateType,
                    data: map
                });
            }
        }


        vm.save = function(){
            if (vm.data1.length==0){
                toastr.error("身体机能还没有评估", "错误");
                return;
            }
            if (vm.data2.length==0){
                toastr.error("生活机能还没有评估", "错误");
                return;
            }
            if (vm.data3.length==0){
                toastr.error("认知机能还没有评估", "错误");
                return;
            }
            if (vm.data4.length==0){
                toastr.error("精神*行动还没有评估", "错误");
                return;
            }
            if (vm.data5.length==0){
                toastr.error("社会适应还没有评估", "错误");
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
            var account = auth.getObject("account")
            vm.message="";
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
            for (var i=0;i<vm.data5.length;i++){
                var data = vm.data5[i].split("-");
                var obj = {
                    itemType:data[0],
                    itemNo:data[1],
                }
                estimateInfo.push(obj);
            }
            for (var i=0;i<vm.data6.length;i++){
                var data = vm.data6[i].split("-");
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
                var proc = Restangular.all('reqEvaluateRegistJap');
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
                var proc = Restangular.all('reqEvaluateRegistJapRcy');
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

        //评估回调
        vm.deregister = $rootScope.$on("CallEvaluateMethod",function(e,data){
            if (data.itemType == "H1"){
                vm.data1 = data.data;
                var h11Count = 0;
                var h12Count = 0;
                for (var i = 0;i<data.data.length;i++){
                    var obj = data.data[i].split("-");
                    if (obj[0] == "H11"){
                        h11Count++;
                    }
                    if (obj[0] == "H12"){
                        h12Count++;
                    }
                }
                var count = data.data.length - h11Count - h12Count;
                if (h11Count >=1){
                    count++;
                }
                if (h12Count >=1){
                    count++;
                }
                vm.menus[0].itemCount = 13 - count;
            }
            if (data.itemType == "H2"){
                vm.data2 = data.data;
                vm.menus[1].itemCount = 12 - data.data.length;
            }
            if (data.itemType == "H3"){
                vm.data3 = data.data;
                vm.menus[2].itemCount = 9 - data.data.length;
            }
            if (data.itemType == "H4"){
                vm.data4 = data.data;
                vm.menus[3].itemCount = 15 - data.data.length;
            }
            if (data.itemType == "H5"){
                vm.data5 = data.data;
                vm.menus[4].itemCount = 6 - data.data.length;
            }
            if (data.itemType == "H6"){
                vm.data6 = data.data;
            }
        });
        $scope.$on('$destory', function() {
            vm.deregister(); // 退订事件
        });
    }

})(this.angular);