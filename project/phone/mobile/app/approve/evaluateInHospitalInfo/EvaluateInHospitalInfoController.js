/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('evaluateInHospitalInfoController', EvaluateInHospitalInfoController);
    /* @ngInject */
    function EvaluateInHospitalInfoController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.personName = $stateParams.param.personName;
        vm.accessDiv = $stateParams.accessDiv;
        vm.evaluateDate = $stateParams.param.evaluateDate;
        vm.evaluatePerson = $stateParams.param.evaluatePerson;
        vm.evaluationLevel = $stateParams.param.evaluationLevel;
        vm.badlLevel = $stateParams.param.badlLevel;
        vm.iadlLevel = $stateParams.param.iadlLevel;
        vm.mmseLevel = $stateParams.param.mmseLevel;
        vm.spcsLevel = $stateParams.param.spcsLevel;
        //日式
        vm.physical = $stateParams.param.physical;
        vm.vitalActivity = $stateParams.param.vitalActivity;
        vm.cognitive = $stateParams.param.cognitive;
        vm.obstacle = $stateParams.param.obstacle;
        vm.socialLife = $stateParams.param.socialLife;
    }

})(this.angular);