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
            .state('app.serviceImmp',
                {
                    url: '/servicePersonList/serviceList/serviceImmp',
                    params: {
                        memberId: 0,
                        careNo: "",
                        accessDiv:2,
                        dealNo:0
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceImplementation/serviceList/serviceImmplement/ServiceImmp.html'),
                            controller: 'serviceImmpController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceImplementation/serviceList/serviceImmplement/ServiceImmpConfig.js')
                                                ,MobilePublic.getServerUrl('app/serviceImplementation/serviceList/serviceImmplement/ServiceImmpController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.handWrite',
                {
                    url: '/servicePersonList/handWrite',
                    params: {
                        type: 1,
                        subData:"",
                        dealNo:[]
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/handwrite/HandWrite.html'),
                            controller: 'handWriteController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/handwrite/HandWriteConfig.js')
                                                ,MobilePublic.getServerUrl('app/handwrite/HandWriteController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })

            .state('app.servicePersonContract',
                {
                    url: '/servicePersonList/serviceList/servicePersonContract',
                    params: {
                        memberId: 0
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceImplementation/serviceList/servicePersonContract/ServicePersonContract.html'),
                            controller: 'servicePersonContractController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceImplementation/serviceList/servicePersonContract/ServicePersonContractConfig.js')
                                                ,MobilePublic.getServerUrl('app/serviceImplementation/serviceList/servicePersonContract/ServicePersonContractController.js')
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