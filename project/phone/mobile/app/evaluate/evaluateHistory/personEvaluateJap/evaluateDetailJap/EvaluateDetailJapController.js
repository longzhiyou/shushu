/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('evaluateDetailJapController', EvaluateDetailJapController);
    /* @ngInject */
    function EvaluateDetailJapController( $scope,$rootScope,$ionicHistory, $ionicPopup,Restangular,$stateParams){
        var vm = this;

        vm.selectMap =  $stateParams.data;
        vm.evaluateType = $stateParams.evaluateType;
        vm.itemType = $stateParams.itemType;
        vm.evaluateDetail;
        if (vm.itemType == "H1"){
            vm.title = "身体机能";
        }
        if (vm.itemType == "H2"){
            vm.title = "生活机能";
        }
        if (vm.itemType == "H3"){
            vm.title = "认知机能";
        }
        if (vm.itemType == "H4"){
            vm.title = "精神*行动";
        }
        if (vm.itemType == "H5"){
            vm.title = "社会适应";
        }
        if (vm.itemType == "H6"){
            vm.title = "医疗行为";
        }
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
                        for (var j = 0;j<vm.evaluateDetail[i].japDetail.length;j++) {
                            var key = vm.evaluateDetail[i].japDetail[j].itemType + "-" +vm.evaluateDetail[i].japDetail[j].itemNo;
                            if (isExist(vm.selectMap,key)>=0) {
                                vm.evaluateDetail[i].japDetail[j].itemName = true;
                            }
                        }
                    }
                }

            }, function() {

            });
        }
        vm.buttonOnclick = function(item){
            var key = item.itemType + "-" + item.itemNo;
            var idx = isExist(vm.selectMap,key);
            if (idx == -1){
                vm.selectMap.push(key);
                if (item.itemType == "H11" || item.itemType  == "H12") {
                    resetSelect2(item.itemType, item.itemNo);
                } else if (item.itemType == "H61" || item.itemType  == "H62"){
                } else {
                    resetSelect(item.itemType, item.itemNo);
                }
            } else {
                vm.selectMap = delData(vm.selectMap,idx);
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
        function resetSelect(itemType,itemNo){
            for (var i = 0;i<vm.evaluateDetail.length;i++){
                if (vm.evaluateDetail[i].itemType == itemType){
                    for (var j = 0; j < vm.evaluateDetail[i].japDetail.length; j++) {
                        var item = vm.evaluateDetail[i].japDetail[j];
                        var key = item.itemType + "-" + item.itemNo;
                        if (itemNo != item.itemNo) {
                            var idx = isExist(vm.selectMap, key);
                            if (idx >= 0) {
                                vm.selectMap = delData(vm.selectMap, idx);
                                vm.evaluateDetail[i].japDetail[j].itemName = false;
                            }
                        }
                    }
                    break;
                }
            }
        }
        function resetSelect2(itemType,itemNo){
            for (var i = 0;i<vm.evaluateDetail.length;i++){
                if (vm.evaluateDetail[i].itemType == itemType){
                    for (var j = 0; j < vm.evaluateDetail[i].japDetail.length; j++) {
                        var item = vm.evaluateDetail[i].japDetail[j];
                        var key = item.itemType + "-" + item.itemNo;
                        if (itemNo == "1") {
                            if (itemNo != item.itemNo) {
                                var idx = isExist(vm.selectMap, key);
                                if (idx >= 0) {
                                    vm.selectMap = delData(vm.selectMap, idx);
                                    vm.evaluateDetail[i].japDetail[j].itemName = false;
                                }
                            }
                        } else {
                            key = item.itemType + "-1";
                            var idx = isExist(vm.selectMap, key);
                            if (idx >= 0) {
                                vm.selectMap = delData(vm.selectMap, idx);
                                vm.evaluateDetail[i].japDetail[0].itemName = false;
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }
        vm.confirm = function(){
            $rootScope.$emit("CallEvaluateMethod", {"itemType": vm.itemType, "data": vm.selectMap});
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