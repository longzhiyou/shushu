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
    angular.module("app").config(ServiceAllSearchMenu);

    /* @ngInject */
    function ServiceAllSearchMenu($stateProvider) {

        $stateProvider
            .state('app.serviceAllSearch',
                {
                    url: '/serviceAllSearchMenu/serviceAllSearch',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceAllSearchMenu/serviceAllSearch/ServiceAllSearchPersonList.html'),
                            controller: 'serviceAllSearchPersonListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceAllSearchMenu/serviceAllSearch/ServiceAllSearchPersonListConfig.js')
                                                ,MobilePublic.getServerUrl('app/serviceAllSearchMenu/serviceAllSearch/ServiceAllSearchPersonListController.js')
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