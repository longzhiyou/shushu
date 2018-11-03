/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('evaluateDetailZfcController', EvaluateDetailZfcController);
    /* @ngInject */
    function EvaluateDetailZfcController($scope, $rootScope,$ionicHistory, Restangular,$stateParams,$ionicPopup){
        var vm = this;
        vm.message="";
        vm.selectMap =  $stateParams.data;
        vm.evaluateType = $stateParams.evaluateType;
        vm.itemType = $stateParams.itemType;
        if (vm.itemType == "F"){
            vm.title = "日常生活活动";
        }
        if (vm.itemType == "G"){
            vm.title = "精神状态";
        }
        if (vm.itemType == "H"){
            vm.title = "感知觉与沟通";
        }
        if (vm.itemType == "I"){
            vm.title = "社会参与";
        }

        vm.evaluateDetail;

        vm.credentials={
            "evaluateType":vm.evaluateType,
            "itemType":vm.itemType
        };
        function getEvaluateList() {
            var proc = Restangular.all('reqEvaluateDetailList');
            proc.post(vm.credentials).then(function(ret) {

                if (ret.returnCode == "0") {
                    vm.evaluateDetail = ret.evaluateDetail;
                    for (var i = 0;i<vm.evaluateDetail.length;i++){
                        for (var j = 0;j<vm.evaluateDetail[i].stdDetail.length;j++) {
                            var key = vm.evaluateDetail[i].stdDetail[j].itemId + "-" +vm.evaluateDetail[i].stdDetail[j].itemDetailId;
                            if (isExist(vm.selectMap,key)>=0) {
                                vm.evaluateDetail[i].stdDetail[j].itemName = true;
                            }
                        }
                    }
                }


            }, function() {

            });
        }
        vm.buttonOnclick = function(item){
            var key = item.itemId + "-" + item.itemDetailId;
            var idx = isExist(vm.selectMap,key);
            if (idx == -1){
                vm.selectMap.push(key);
                resetSelect(item.itemId, item.itemDetailId);

            } else {
                vm.selectMap = delData(vm.selectMap,idx);
                $stateParams.data = vm.selectMap;
            }
        }
        function isExist(list,key){
            for (var i = 0;i<list.length;i++){
                if (list[i] == key){
                    return i
                }
            }
            return -1;
        }

        //list中删除数据
        function delData(list,n){
            return list.slice(0,n).concat(list.slice(n+1,list.length));
        }
        function resetSelect(itemId,itemDetailId){
            for (var i = 0;i<vm.evaluateDetail.length;i++){
                if (vm.evaluateDetail[i].itemId == itemId){
                    for (var j = 0; j < vm.evaluateDetail[i].stdDetail.length; j++) {
                        var item = vm.evaluateDetail[i].stdDetail[j];
                        var key = item.itemId + "-" + item.itemDetailId;
                        if (itemDetailId != item.itemDetailId) {
                            var idx = isExist(vm.selectMap, key);
                            if (idx >= 0) {
                                vm.selectMap = delData(vm.selectMap, idx);
                                $stateParams.data = vm.selectMap;
                                vm.evaluateDetail[i].stdDetail[j].itemName = false;
                            }
                        }
                    }
                    break;
                }
            }
        }

        vm.confirm = function(){
            $rootScope.$emit("CallEvaluateStdMethod", {"itemType": vm.itemType, "data": vm.selectMap});
            $ionicHistory.goBack(-1);
        }
        vm.onHold= function(comment){
            var alertPopup = $ionicPopup.alert({
                title: '信息',
                template: comment
            });
            alertPopup.then(function(res) {

            });
        };

        getEvaluateList();

    }

})(this.angular);