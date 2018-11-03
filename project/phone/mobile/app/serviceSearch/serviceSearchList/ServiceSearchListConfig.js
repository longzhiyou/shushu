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
    angular.module("app").config(ServiceSearchListConfig);

    /* @ngInject */
    function ServiceSearchListConfig($stateProvider) {

        $stateProvider
            .state('app.serviceSearchDetail',
                {
                    url: '/serviceSearch/serviceSearchList/serviceSearchDetail',
                    params: {
                        memberId: 0,
                        careDetailNo: "",
                        accessDiv:2,
                        dealNo:null,
                        planDate:""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceSearch/serviceSearchList/serviceSearchDetail/ServiceSearchDetail.html'),
                            controller: 'serviceSearchDetailController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceSearch/serviceSearchList/serviceSearchDetail/ServiceSearchDetailController.js')
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