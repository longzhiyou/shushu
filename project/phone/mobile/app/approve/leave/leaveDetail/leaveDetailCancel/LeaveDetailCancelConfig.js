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
    angular.module("app").config(LeaveDetailConfig);

    /* @ngInject */
    function LeaveDetailConfig($stateProvider) {

        $stateProvider
            .state('app.otherAgreeLeave',
                {
                    url: '/approve/leave/leaveDetail/otherAgree',
                    params: {
                        leaveApplyId: 0,
                        staffId: 0,
                        auditId: 0,
                        sourceLeaveApplyId: '',
                        leaveApplyType: "0"
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/leave/leaveDetail/otherAgree/OtherAgreeLeave.html'),
                            controller: 'otherAgreeLeaveController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/leave/leaveDetail/otherAgree/OtherAgreeLeaveController.js')
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