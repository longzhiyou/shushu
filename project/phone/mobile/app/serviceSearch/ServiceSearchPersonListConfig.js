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
    angular.module("app").config(ServiceSearchPersonListConfig);

    /* @ngInject */
    function ServiceSearchPersonListConfig($stateProvider) {

        $stateProvider
            .state('app.serviceSearchList',
                {
                    url: '/serviceSearch/serviceSearchList',
                    params: {
                        memberId: 1,
                        accessDiv: 2,
                        planDate:""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceSearch/serviceSearchList/ServiceSearchList.html'),
                            controller: 'serviceSearchListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceSearch/serviceSearchList/ServiceSearchListConfig.js')
                                                ,MobilePublic.getServerUrl('app/serviceSearch/serviceSearchList/ServiceSearchListController.js')
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