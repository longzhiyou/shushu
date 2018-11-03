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
    angular.module("app").config(ReturnVisitListConfig);

    /* @ngInject */
    function ReturnVisitListConfig($stateProvider) {

        $stateProvider
            .state('app.returnVisitAllList',
                {
                    url: '/intentionalityCustomer/customerInfo/returnVisitInfo/ReturnVisitInfoDetail',
                    params: {
                        data:0,
                        index:null
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/returnVisitInfo/ReturnVisitInfoDetail/ReturnVisitDetailInfo.html'),
                            controller: 'returnVisitDetailController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/returnVisitInfo/ReturnVisitInfoDetail/ReturnVisitDetailController.js')
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