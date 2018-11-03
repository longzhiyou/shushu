/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('examInHospitalInfoController', ExamInHospitalInfoController);
    /* @ngInject */
    function ExamInHospitalInfoController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.examDate = $stateParams.param.examDate;
        vm.examinationUnit = $stateParams.param.examinationUnit;
        vm.nutritionalStatusText = $stateParams.param.nutritionalStatusText;
        vm.careAbilityText = $stateParams.param.careAbilityText;
        vm.mentalStateText = $stateParams.param.mentalStateText;
        vm.capacityText = $stateParams.param.capacityText;
        vm.personName = $stateParams.param.personName;
    }

})(this.angular);