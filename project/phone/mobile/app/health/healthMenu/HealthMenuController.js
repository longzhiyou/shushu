/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('healthMenuController', HealthMenuController);
    /* @ngInject */
    function HealthMenuController(auth,$scope,$stateParams,$state, Restangular,toastr,permissions){
        var vm = this;
        vm.permissions = permissions;
        vm.personId = $stateParams.personId;
        vm.memberId = $stateParams.memberId;
        vm.personName = $stateParams.personName;

        //迁移到子画面
        vm.toVitalSign = function(){

            $state.go("app.vitalSign", {
                memberId: vm.memberId,
                personId: vm.personId,
                personName: vm.personName
            });

        }

        vm.toBloodGlucose = function(){

            $state.go("app.bloodGlucose", {
                memberId: vm.memberId,
                personId: vm.personId,
                personName: vm.personName
            });
        }

        vm.toMedicalRecord = function(){
            $state.go("app.medicalRecordList", {
                memberId: vm.memberId,
                personId: vm.personId,
                personName: vm.personName
            });
        }

        vm.toHealthCurve = function(){
            $state.go("app.healthCurve", {
                memberId: vm.memberId,
                personId: vm.personId,
                personName: vm.personName
            });
        }

        vm.toMedicalWrite = function(){

            $state.go("app.medicalWrite", {
                memberId: vm.memberId,
                personId: vm.personId,
                personName: vm.personName
            });

        }
    }

})(this.angular);