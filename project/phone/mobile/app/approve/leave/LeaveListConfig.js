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
            .state('app.leaveDetail',
                {
                    url: '/approve/leave/leaveDetail',
                    params: {
                        leaveApplyId: 0,
                        staffId: 0,
                        auditId: 0,
                        sourceLeaveApplyId: '',
                        leaveApplyType: "0"
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/leave/leaveDetail/LeaveDetail.html'),
                            controller: 'leaveDetailController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/leave/leaveDetail/LeaveDetailConfig.js'),
                                                MobilePublic.getServerUrl('app/approve/leave/leaveDetail/LeaveDetailController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.leaveDetailCancel',
                {
                    url: '/approve/leave/leaveDetail/leaveDetailCancel',
                    params: {
                        leaveApplyId: 0,
                        staffId: 0,
                        auditId: 0,
                        sourceLeaveApplyId: '',
                        leaveApplyType: "0"
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/leave/leaveDetail/leaveDetailCancel/LeaveDetailCancel.html'),
                            controller: 'leaveDetailCancelController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/leave/leaveDetail/leaveDetailCancel/LeaveDetailCancelConfig.js'),
                                                MobilePublic.getServerUrl('app/approve/leave/leaveDetail/leaveDetailCancel/LeaveDetailCancelController.js')
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