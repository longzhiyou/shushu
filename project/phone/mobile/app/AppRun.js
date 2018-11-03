/**
 * 最后执行的模块
* The application startup function, called in the app module's run block
 * Created apart from app.js so it can be easily stubbed out
 * during testing or tested independently
 *
 * Created by bukeyan on 2016/6/12.
 */

(function( angular ) {
    "use strict";

    angular.module('app').run(AppStart);
    /* @ngInject */
    function AppStart($ionicPlatform,$rootScope, $state, $stateParams,auth,authManager) {

        authManager.redirectWhenUnauthenticated();
        auth.init();

        moment.locale("zh-cn");

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;


        $ionicPlatform.ready(function() {


            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });



        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {

                if (!authManager.isAuthenticated() ) {
                    if (toState.name !== "login") {
                        event.preventDefault();
                        $state.go("login");
                    }
                }

            });

    }

})( this.angular );
