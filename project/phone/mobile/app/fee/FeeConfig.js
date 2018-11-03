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
    angular.module("app").config(FeeConfig);

    /* @ngInject */
    function FeeConfig($stateProvider) {

        $stateProvider
            .state('app.payMode',
                {
                    url: '/fee/payMode',
                    params: {
                        tfPaymentModeList: [],
                        index:-1,
                        allSum:0,
                        accountSum:0
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/fee/payMode/PayMode.html'),
                            controller: 'payModeController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/fee/payMode/PayModeController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.payDetail',
                {
                    url: '/fee/payDetail',
                    params: {
                        tfDealList:[]
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/fee/payDetail/PayDetail.html'),
                            controller: 'payDetailController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/fee/payDetail/PayDetailController.js')
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