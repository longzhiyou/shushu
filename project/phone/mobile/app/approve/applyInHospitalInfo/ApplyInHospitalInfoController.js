/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('applyInHospitalInfoController', ApplyInHospitalInfoController);
    /* @ngInject */
    function ApplyInHospitalInfoController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.applyDate = $stateParams.param.applyDate;
        vm.applyName = $stateParams.param.applyName;
        vm.bedString = $stateParams.param.bedString;
        vm.compartment = $stateParams.param.compartment;
    }

})(this.angular);