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
            .state('app.overtimeDetail',
                {
                    url: '/approve/overtime/overtimeDetail',
                    params: {
                        otApplyId: 0,
                        staffId: 0,
                        auditId: 0,
                        sourceOtApplyId: '',
                        otApplyType: "0"
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/overtime/overtimeDetail/OvertimeDetail.html'),
                            controller: 'overtimeDetailController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/overtime/overtimeDetail/OvertimeDetailController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.overtimeDetailCancel',
                {
                    url: '/approve/overtime/overtimeDetailCancel',
                    params: {
                        otApplyId: 0,
                        staffId: 0,
                        auditId: 0,
                        sourceOtApplyId: '',
                        otApplyType: "0"
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/overtime/overtimeDetailCancel/OvertimeDetailCancel.html'),
                            controller: 'overtimeDetailCancelController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/overtime/overtimeDetailCancel/OvertimeDetailCancelController.js')
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