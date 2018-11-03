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
    angular.module("app").config(ServicePersonListConfig);

    /* @ngInject */
    function ServicePersonListConfig($stateProvider) {

        $stateProvider
            .state('app.paymentDetail',
                {
                    url: '/approve/payment/paymentDetail',
                    params: {
                        memberId: 0,
                        applyId: 0
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/payment/paymentDetail/PaymentDetail.html'),
                            controller: 'paymentDetailController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/payment/paymentDetail/PaymentDetailController.js')
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