/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('bloodGlucoseController', BloodGlucoseController);
    /* @ngInject */
    function BloodGlucoseController($stateParams,healthService,$ionicHistory,toastr,ionicDatePicker,baseDataService){
        var vm = this;
        vm.personName = $stateParams.personName;
        vm.baseData = baseDataService.get();
        vm.info={
            // personId:$stateParams.personId,
            memberId:$stateParams.memberId,
            /** 测量日期时间. */
            inputDate:"",
            /** 时段. */
            timeInterval:"01",
            /** 血糖. */
            bloodGlucoseValue:"",
            /** 备注. */
            comment:""
        };


        vm.save =save;

        function save() {
            //失败提示，成功返回上一级菜单
            vm.info.inputDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            healthService.saveBloodGlucose(vm.info).then(function(data) {
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