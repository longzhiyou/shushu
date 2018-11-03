/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('accountController', AccountController);
    /* @ngInject */
    function AccountController($state,auth,$ionicHistory,Restangular){
        var vm = this;
        vm.clear = clear;
        vm.isGroup = false;
        var account = auth.getObject("account");
        vm.url = account.photoFile;
        if (vm.url == null || vm.url == ''){
            vm.url = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
        }
        vm.background = MobilePublic.getServerUrl('assets/img/home/login.png',true);
        vm.personName = account.staffName;
        if (account.groupUser == '1'){
            vm.isGroup = true;
        }
        function clear() {
            logout();

        }

        //删除图片
        function logout() {
            var account = auth.getObject("account");
            var logoutData={
                "userId": account.staffId,
                "systemTime":""
            };

            var proc = Restangular.all('mobileLogout');
            proc.post(logoutData).then(function(ret) {
                $ionicHistory.clearCache();
                auth.clear();
                $state.go('login');
            }, function() {
                $ionicHistory.clearCache();
                auth.clear();
                $state.go('login');
            });
        }
        vm.clearHistory = function(){
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            /*if (isSafari()) {
                document.body.style.display = "none";
                window.location.reload();
            } else {
                document.body.style.display = "none";
                window.location.reload();
            }*/
        }
        function isSafari() {
            if (navigator.userAgent.indexOf("Safari") > -1) {
                return true;
            }
            return false;
        }

    }

})(this.angular);