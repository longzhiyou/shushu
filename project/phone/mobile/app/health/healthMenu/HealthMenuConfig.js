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
            .state('app.vitalSign',
                {
                    url: '/health/healthMenu/vitalSign',
                    params: {
                        personId: null,
                        memberId: null,
                        personName: ""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/health/healthMenu/vitalSign/VitalSign.html'),
                            controllerAs: 'vm',
                            controller:'vitalSignController',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/health/healthMenu/vitalSign/HealthService.js'),
                                                ,MobilePublic.getServerUrl('app/health/healthMenu/vitalSign/VitalSignController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }
                })
            .state('app.bloodGlucose',
                {
                    url: '/health/healthMenu/bloodGlucose',
                    params: {
                        personId: null,
                        memberId: null,
                        personName: ""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/health/healthMenu/bloodGlucose/BloodGlucose.html'),
                            controllerAs: 'vm',
                            controller:"bloodGlucoseController",
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/health/healthMenu/vitalSign/HealthService.js'),
                                                ,MobilePublic.getServerUrl('app/health/healthMenu/bloodGlucose/BloodGlucoseController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }
                })
            .state('app.medicalRecordList',
                {
                    url: '/health/healthMenu/medicalRecord',
                    params: {
                        personId: null,
                        memberId: null,
                        personName: ""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/health/healthMenu/medicalRecord/MedicalRecordList.html'),
                            controllerAs: 'vm',
                            controller:"medicalRecordListController",
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                 MobilePublic.getServerUrl('app/health/healthMenu/medicalRecord/MedicalRecordListConfig.js'),
                                                 MobilePublic.getServerUrl('app/health/healthMenu/medicalRecord/MedicalRecordListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }
                })
            .state('app.healthCurve',
                {
                    url: '/health/healthMenu/healthCurve',
                    params: {
                        personId: null,
                        memberId: null,
                        personName: ""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/health/healthMenu/healthCurve/HealthCurve.html'),
                            controllerAs: 'vm',
                            controller:"healthCurveController",
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/health/healthMenu/healthCurve/HealthCurveController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }
                })
            .state('app.medicalWrite',
                {
                    url: '/health/healthMenu/medicalWrite',
                    params: {
                        personId: null,
                        memberId: null,
                        personName: ""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/health/healthMenu/medicalWrite/MedicalWrite.html'),
                            controllerAs: 'vm',
                            controller:'medicalWriteController',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/health/healthMenu/vitalSign/HealthService.js'),
                                                MobilePublic.getServerUrl('app/health/healthMenu/medicalWrite/MedicalWriteController.js')
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