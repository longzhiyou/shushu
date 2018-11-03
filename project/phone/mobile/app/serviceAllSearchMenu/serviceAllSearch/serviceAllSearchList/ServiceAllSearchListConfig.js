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
    angular.module("app").config(ServiceAllSearchListConfig);

    /* @ngInject */
    function ServiceAllSearchListConfig($stateProvider) {

        $stateProvider
            .state('app.serviceAllSearchDetail',
                {
                    url: '/serviceAllSearchMenu/serviceAllSearch/serviceAllSearchList/serviceAllSearchDetail',
                    params: {
                        memberId: 0,
                        careDetailNo: "",
                        accessDiv:2
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceAllSearchMenu/serviceAllSearch/serviceAllSearchList/serviceAllSearchDetail/ServiceAllSearchDetail.html'),
                            controller: 'serviceAllSearchDetailController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceAllSearchMenu/serviceAllSearch/serviceAllSearchList/serviceAllSearchDetail/ServiceAllSearchDetailController.js')
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