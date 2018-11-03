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
    angular.module("app").config(AccountConfig);

    /* @ngInject */
    function AccountConfig($stateProvider) {

        $stateProvider

            .state('app.chgPassword',
                {
                    url: '/account/chgPassword',
                    views: {
                        'tab-account': {
                            templateUrl: MobilePublic.getServerUrl('app/account/chgPassword/ChgPassword.html'),
                            controller: 'chgPasswordController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/account/chgPassword/ChgPasswordController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }
                    }
                })
            .state('app.about',
                {
                    url: '/account/about',
                    views: {
                        'tab-account': {
                            templateUrl: MobilePublic.getServerUrl('app/account/about/About.html'),
                            controller: 'aboutController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/account/about/AboutController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }
                })
        ;
  
    }

})(this.angular);