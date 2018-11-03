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
    angular.module("app").config(ServiceImmpConfig);

    /* @ngInject */
    function ServiceImmpConfig($stateProvider) {

        $stateProvider
            .state('app.serviceImmpEnd',
                {
                    url: '/servicePersonList/serviceList/serviceImmp',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceImplementation/serviceList/serviceImmplenment/ServiceImmpList.html'),
                            controller: 'serviceListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceImplementation/serviceList/serviceImmplenment/ServiceImmpListConfig.js')
                                                ,MobilePublic.getServerUrl('app/serviceImplementation/serviceList/serviceImmplenment/ServiceImmpListController.js')
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