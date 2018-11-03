/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('customerInfoController', CustomerInfoController);
    /* @ngInject */
    function CustomerInfoController($rootScope,$scope,$stateParams,customerInfoService,
                                  $ionicHistory, $ionicActionSheet,$ionicPopup,Restangular,
                                  $cordovaCamera,toastr,baseDataService, ionicDatePicker,permissions){

        var vm = this;
        vm.regularList = $rootScope.regularList;
        vm.customerId=$stateParams.customerId;
        vm.title = $stateParams.personName;
        //vm.front = MobilePublic.getServerUrl('assets/img/home/iden_front.png',true);
        //vm.back = MobilePublic.getServerUrl('assets/img/home/iden_back.png',true);
        //vm.headIcon = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
        vm.permission="RCY403";
        vm.allInfo={};
        vm.baseData=baseDataService.get();
        vm.permissions = permissions;
        vm.save = save;
        vm.saveFlg = false;
        var ipObj1 = {
            callback: function (val) {  //Mandatory
                vm.allInfo.returnVisitDate = moment(val).format("YYYY-MM-DD");
            },
            to: null, //选择任意日期
        };

        vm.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };


        function init() {

            $scope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {

                });

            customerInfoService.init(vm.customerId).then(function(ret){
                vm.allInfo = ret;

                $scope.vm = vm;

            },function(){

            });
        }

        init();

        function save() {
            if(!vm.allInfo.personName){
                toastr.error("意向客户姓名为空");
                return;
            }

            if(vm.allInfo.personName.length > 20){
                toastr.error("意向客户姓名长度不能大于20。");
                return;
            }

            if(vm.allInfo.age != null && vm.allInfo.age != '' && vm.allInfo.age.length > 3){
                toastr.error("意向客户年龄长度不能大于3。");
                return;
            }

            var rex=/^1[3-8]\d{9}$/;
            var rex2=/^((0\d{2,3})-)(\d{7,8})(-(\d{1,6}))?$/;

            if(vm.allInfo.contact){
                if(!(rex.test(vm.allInfo.contact)||rex2.test(vm.allInfo.contact))){
                    toastr.error("请输入正确的电话(格式:区号-座机号-分机号)或手机号码.");
                    return;
                }
            }

            if(vm.allInfo.address != null && vm.allInfo.address != '' && vm.allInfo.address.length > 100){
                toastr.error("意向客户具体地址长度不能大于100。");
                return;
            }
            if(vm.allInfo.orgWorkunit != null && vm.allInfo.orgWorkunit != '' && vm.allInfo.orgWorkunit.length > 50){
                toastr.error("意向客户原工作单位长度不能大于50。");
                return;
            }

            if(vm.allInfo.orgWorkunitPosition != null && vm.allInfo.orgWorkunitPosition != '' && vm.allInfo.orgWorkunitPosition.length > 20){
                toastr.error("意向客户原职业长度不能大于20。");
                return;
            }

            if(vm.allInfo.familyStructure != null && vm.allInfo.familyStructure != '' && vm.allInfo.familyStructure.length > 20){
                toastr.error("意向客户家庭结构长度不能大于20。");
                return;
            }

            if(vm.allInfo.personMemo != null && vm.allInfo.personMemo != '' && vm.allInfo.personMemo.length > 300){
                toastr.error("意向客户备注长度不能大于300。");
                return;
            }
            //家属check
            if(vm.allInfo.sibName != null && vm.allInfo.sibName != '' && vm.allInfo.sibName.length > 20){
                toastr.error("家属姓名长度不能大于20。");
                return;
            }

            if(vm.allInfo.sibContact != null && vm.allInfo.sibContact != '' && vm.allInfo.sibContact){
                if(!(rex.test(vm.allInfo.sibContact)||rex2.test(vm.allInfo.sibContact))){
                    toastr.error("请输入正确的家属电话(格式:区号-座机号-分机号)或手机号码.");
                    return;
                }
            }

            if(vm.allInfo.sibMemo != null && vm.allInfo.sibMemo != '' && vm.allInfo.sibMemo.length > 300){
                toastr.error("家属备注长度不能大于300。");
                return;
            }
            //关注信息
            if(vm.allInfo.affordableCost != null && vm.allInfo.affordableCost != '' && vm.allInfo.affordableCost.length > 100){
                toastr.error("可承担费用长度不能大于100。");
                return;
            }

            if(vm.allInfo.concernsMemo != null && vm.allInfo.concernsMemo != '' && vm.allInfo.concernsMemo.length > 300){
                toastr.error("关注信息备注长度不能大于300。");
                return;
            }
            //营销小结
            if(vm.allInfo.summaryMemo != null && vm.allInfo.summaryMemo != '' && vm.allInfo.summaryMemo.length > 300){
                toastr.error("营销小结备注长度不能大于300。");
                return;
            }


            if (vm.saveFlg){
                vm.msg = "数据已经提交，再次提交可能会产生重复数据，"
            } else {
                vm.msg = ""
            }
            var confirmPopup = $ionicPopup.confirm({
                title: '确认',
                template: vm.msg + '确认保存该意向客户信息吗？'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    vm.saveFlg = true;
                    customerInfoService.save(vm.customerId).then(function(data) {
                            toastr.info("保存成功");
                            $rootScope.$emit("CallCustomerListMethod",{});
                            $ionicHistory.goBack(-1);
                            vm.saveFlg = false;
                        }, function() {
                            toastr.error("保存失败");
                            vm.saveFlg = false;
                        }

                    );
                } else {
                    return;
                }
            });
        }





    }

})(this.angular);