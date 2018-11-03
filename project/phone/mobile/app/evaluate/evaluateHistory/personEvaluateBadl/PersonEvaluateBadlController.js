/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('personEvaluateBadlController', PersonEvaluateBadlController);
    /* @ngInject */
    function PersonEvaluateBadlController($scope, $rootScope,$ionicHistory, Restangular,$stateParams,$state,auth,$ionicPopup,toastr){
        var vm = this;
        vm.menus = [];
        vm.evaluateType = $stateParams.accessDiv;
        vm.personId = $stateParams.personId;
        vm.evaluationRecordId = $stateParams.id;
        vm.personName;
        vm.data1=[];
        vm.data2=[];
        vm.data3=[];
        vm.data4=[];
        vm.credentials;
        vm.comment = "";
        vm.headIcon = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
        var obj = {title:"BADL评估",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"F",itemCount:"10"};
        vm.menus.push(obj);

        vm.recorder1;
        vm.recorder2;
        vm.certificateNumber1;
        vm.certificateNumber2;

        /*obj = {title:"精神状态",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"G",itemCount:"3"};
        vm.menus.push(obj);

        obj = {title:"感知觉与沟通",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"H",itemCount:"4"};
        vm.menus.push(obj);

        obj = {title:"社会参与",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateDetail1",itemType:"I",itemCount:"5"};
        vm.menus.push(obj);*/
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
                    vm.recorder1 = ret.recorder;
                    vm.recorder2 = ret.recorder2;
                    vm.certificateNumber1 = ret.certificateNumber1;
                    vm.certificateNumber2 = ret.certificateNumber2;
                    var estimateInfo = ret.estimateInfo;
                    for (var i = 0;i<estimateInfo.length;i++){
                        if (estimateInfo[i].itemType.substr(0,1) == "F"){
                            var key = estimateInfo[i].itemType + "-" + estimateInfo[i].itemNo;
                            vm.data1.push(key);
                            vm.menus[0].itemCount = vm.menus[0].itemCount -1;
                        }

                    }
                    if (vm.evaluationRecordId == -1){
                        var account = auth.getObject("account")
                        vm.recorder1 = account.staffName;
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
            var map = [];
            for (var i = 0;i<data.length;i++){
                map.push(data[i]);
            }
            $state.go("app.evaluateDetailBadl", {
                itemType: item.itemType,
                evaluateType: vm.evaluateType,
                data: map
            });

        }

        vm.save = function(){
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
            vm.credentials={
                "staffId": account.userId,
                "personId":vm.personId,
                "personName":"",
                "confirmDate":"",
                "recorder":vm.recorder1,
                "recorder2":vm.recorder2,
                "certificateNumber1":vm.certificateNumber1,
                "certificateNumber2":vm.certificateNumber2,
                "comment":vm.comment,
                "totalScore":0,
                "page1Score":0,
                "page2Score":0,
                "evaluateRecordId":vm.evaluationRecordId,
                "estimateInfo":estimateInfo
            };
            var proc = Restangular.all('reqEvaluateRegistBadl');
            proc.post(vm.credentials).then(function(ret) {

                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallEvaluateMethod",{});
                    $rootScope.$emit("CallEvaluateHistoryMethod",{});
                    $ionicHistory.goBack(-1);
                }

            }, function() {

            });
        }
        //评估回调
        $rootScope.$on("CallEvaluateStdMethod",function(e,data){
            if (data.itemType == "F"){
                vm.data1 = data.data;
                vm.menus[0].itemCount = 10 - data.data.length;
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