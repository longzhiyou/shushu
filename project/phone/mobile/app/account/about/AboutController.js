/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('aboutController', AboutController);
    /* @ngInject */
    function AboutController($state,auth,$ionicHistory,Restangular){
        var vm = this;
        vm.clear = clear;
        vm.qrcode = MobilePublic.getServerUrl('assets/img/home/qrcode.png',true);
        vm.icon = MobilePublic.getServerUrl('assets/img/home/ic_launcher.png',true);
        function clear() {
            $ionicHistory.clearCache();
            auth.clear();
            $state.go('login');
        }

    }

})(this.angular);