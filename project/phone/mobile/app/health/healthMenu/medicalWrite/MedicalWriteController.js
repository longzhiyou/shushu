/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('medicalWriteController', MedicalWriteController);
    /* @ngInject */
    function MedicalWriteController($stateParams,healthService,$ionicHistory,toastr,ionicDatePicker,auth,Restangular){
        var vm = this;
        vm.operator={};
        vm.personName = $stateParams.personName;
        vm.medicalWriteInfo={
            //personId:$stateParams.personId,
            memberId:$stateParams.memberId,
            /** 测量日期时间. */
            measureDatetime:"",
            operator:"",
            /** 备注. */
            comment:"",

        };

        vm.save =save;

        function save() {

            //失败提示，成功返回上一级菜单
            vm.medicalWriteInfo.measureDatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            var operator=[];
            for(var key in vm.operator){
                if (vm.operator[key]) {
                    operator.push(key);
                }
            }
            if(operator.length < 1){
                toastr.error("参加者不能为空");
                return;
            }
            vm.medicalWriteInfo.operator = operator.join(",");//join 通过指定的分隔符进行分割，把数组中的元素放入字符串
            healthService.saveMedicalWrite(vm.medicalWriteInfo).then(function(data) {
                    toastr.info("保存成功");
                    $ionicHistory.goBack(-1);
                }, function() {
                    toastr.error("保存失败");
                }

            );

        }

        function init() {
            healthService.init();
            var account = auth.getObject("account");
            vm.credentials={
                "department":account.department
            };
            var proc = Restangular.all('reqOperatorList');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    vm.listStaff = ret.listStaff;
                }
            }, function() {

            });
        }
        init();
    }

})(this.angular);