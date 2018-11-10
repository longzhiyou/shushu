/**
 * 配置模块，主要是路由相关.
 *
 * Configures the UI-Router states and their associated URL routes and views
 * Also adds "state-change" reporting for debugging during development
 *
 * Created by longzhiyou on 2016-06-12.
 */
(function(angular){
    "use strict";
    angular.module("app").config(HomeConfig);

    /* @ngInject */
    function HomeConfig($stateProvider) {

        // $stateProvider
        //     //费用相关
        //     .state('app.luming',
        //         {
        //             url: '/luming',
        //             views: {
        //                 'tab-home': {
        //                     templateUrl: MobilePublic.getServerUrl('app/luming/LuMing.html'),
        //                     controller: 'luMingController',
        //                     controllerAs: 'vm',
        //                     resolve: {
        //                         loadPlugin: function ($ocLazyLoad) {
        //                             return $ocLazyLoad.load([
        //                                 {
        //                                     files: [
        //                                         MobilePublic.getServerUrl('app/luming/LuMingController.js')
        //                                     ]
        //                                 }
        //                             ]);
        //                         }
        //                     }
        //
        //                 }
        //             }
        //
        //         })
        //
        // ;

  
    }

})(this.angular);