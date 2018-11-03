/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('vitalSignController', VitalSignController);
    /* @ngInject */
    function VitalSignController($stateParams,healthService,$ionicHistory,toastr,ionicDatePicker){
        var vm = this;
        vm.personName = $stateParams.personName;
        vm.vitalSignInfo={
            personId:$stateParams.personId,
            memberId:$stateParams.memberId,
            /** 测量日期时间. */
            measureDatetime:"",
            /** 体温. */
            temperature:"",
            /** 呼吸. */
            breathing:"",
            /** 低压. */
            bpMin:"",
            /** 高压. */
            bpMax:"",
            /** 脉搏. */
            pulse:"",
            /** 备注. */
            comment:"",
            weight:""
        };

        vm.save =save;

        function save() {
            //失败提示，成功返回上一级菜单
            vm.vitalSignInfo.measureDatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            healthService.saveVitalSign(vm.vitalSignInfo).then(function(data) {
                    toastr.info("保存成功");
                    $ionicHistory.goBack(-1);
                }, function() {
                    toastr.error("保存失败");
                }

            );

        }

        function init() {
            healthService.init();
        }
        init();
    }

})(this.angular);