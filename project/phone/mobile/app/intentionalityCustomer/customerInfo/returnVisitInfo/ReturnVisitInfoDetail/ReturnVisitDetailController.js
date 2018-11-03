/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app',[])
        .controller('returnVisitDetailController', ReturnVisitDetailController);
    /* @ngInject */
    function ReturnVisitDetailController($rootScope,Restangular,$stateParams,ionicDatePicker,baseDataService,permissions,$ionicHistory,auth,customerInfoService){

        var vm = this;
        var account = auth.getObject("account");
        vm.personName = account.staffName;
        vm.selectMap =  $stateParams.data;
        vm.listIndex = $stateParams.index;
        vm.baseData=baseDataService.get();
        vm.allInfo = customerInfoService.get();
        vm.returnVisitDate=vm.selectMap.returnVisitDateStr;
        vm.nextVisitDate=vm.selectMap.nextVisitDateStr;
        vm.intentionality=vm.selectMap.intentionality;
        vm.returnVisitContent=vm.selectMap.returnVisitContent;
        if(!vm.returnVisitDate){
            vm.returnVisitDate = moment(new Date()).format("YYYY-MM-DD");
        }
        if(!vm.intentionality){
            vm.intentionality="";
        }
        var ipObj1 = {
            callback: function (val) {  //Mandatory
                vm.returnVisitDate = moment(val).format("YYYY-MM-DD");
            },
            to: null, //选择任意日期
        };

        vm.openDatePicker1 = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        var ipObj2 = {
            callback: function (val) {  //Mandatory
                vm.nextVisitDate = moment(val).format("YYYY-MM-DD");
            },
            to: null, //选择任意日期
        };

        vm.openDatePicker2 = function(){
            ionicDatePicker.openDatePicker(ipObj2);
        };

        vm.permission="RCY403";
        vm.permissions = permissions;

        vm.save = function(){
            if (!vm.nextVisitDate) {
                vm.nextVisitDate;
            }else {

                vm.nextVisitDate = moment(vm.nextVisitDate).format("YYYY-MM-DD");

            }
            //点击保存后，删除该条数据再新增保存
            if(vm.listIndex != null){
                vm.allInfo.returnVisitList.splice(vm.listIndex, 1);
            }
            var intentionalityName;
            if(vm.intentionality == ''){
                intentionalityName = "";
            }else {
                intentionalityName = vm.baseData.intentionalityList[vm.intentionality].value;
            }

            var immData ={
                "intentionality":vm.intentionality,
                "returnVisitDate":moment(vm.returnVisitDate).format("YYYY-MM-DD"),
                "returnVisitContent":vm.returnVisitContent,
                "nextVisitDate":vm.nextVisitDate,
                "modifier":vm.personName,
                "intentionalityName":intentionalityName
            }

            $rootScope.$emit("CustomerReturnMethod", { "data": immData});
            $ionicHistory.goBack(-1);
        }


    }

})(this.angular);