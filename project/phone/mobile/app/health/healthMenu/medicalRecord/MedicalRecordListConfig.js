/**
 * 健康配置模块，主要是路由相关.
 *
 * Created by longzhiyou on 2016-06-12.
 */
(function(angular){
    "use strict";
    angular.module("app").config(HealthConfig);

    /* @ngInject */
    function HealthConfig($stateProvider) {
        $stateProvider
            .state('app.medicalRecordDetail',
                {
                    url: '/health/healthMenu/medicalRecord/medicalRecordDetail',
                    params: {
                        recordId: 0,
                        memberId: 0,
                        operator: ""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/health/healthMenu/medicalRecord/medicalRecordDetail/MedicalRecordDetail.html'),
                            controllerAs: 'vm',
                            controller:'medicalRecordDetailController',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/health/healthMenu/medicalRecord/medicalRecordDetail/MedicalRecordDetailController.js')
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