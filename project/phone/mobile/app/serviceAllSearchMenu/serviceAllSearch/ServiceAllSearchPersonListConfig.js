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
    angular.module("app").config(ServiceAllSearchPersonListConfig);

    /* @ngInject */
    function ServiceAllSearchPersonListConfig($stateProvider) {

        $stateProvider
            .state('app.serviceAllSearchList',
                {
                    url: '/serviceAllSearchMenu/serviceAllSearch/serviceAllSearchList',
                    params: {
                        memberId: 1,
                        accessDiv: 2,
                        planDate:""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceAllSearchMenu/serviceAllSearch/serviceAllSearchList/ServiceAllSearchList.html'),
                            controller: 'serviceAllSearchListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceAllSearchMenu/serviceAllSearch/serviceAllSearchList/ServiceAllSearchListConfig.js')
                                                ,MobilePublic.getServerUrl('app/serviceAllSearchMenu/serviceAllSearch/serviceAllSearchList/ServiceAllSearchListController.js')
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