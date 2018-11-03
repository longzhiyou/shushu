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
    angular.module("app").config(ServiceListConfig);

    /* @ngInject */
    function ServiceListConfig($stateProvider) {

        $stateProvider
            .state('app.personMap',
                {
                    url: '/servicePersonList/serviceList/servicePersonContract/personMap',
                    params: {
                        lat: "0",
                        lng: "0",
                        url:""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceImplementation/serviceList/servicePersonContract/personMap/PersonMap.html'),
                            controller: 'personMapController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                               ,MobilePublic.getServerUrl('app/serviceImplementation/serviceList/servicePersonContract/personMap/PersonMapController.js')
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