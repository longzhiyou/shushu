/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('serviceItemInfoController', ServiceItemInfoController);
    /* @ngInject */
    function ServiceItemInfoController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.serviceItemList = $stateParams.serviceItem;
        vm.flag = $stateParams.flag;
        vm.careRankName = $stateParams.careRankName;
        vm.packageName = $stateParams.packageName;
        vm.personName = $stateParams.personName;
        vm.noData = false;
        if(vm.serviceItemList == null || vm.serviceItemList.length == 0){
            vm.noData = true;
        }
    }

})(this.angular);