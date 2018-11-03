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
            .state('app.leaveList',
                {
                    url: '/approve/leave',

                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/leave/LeaveList.html'),
                            controller: 'leaveListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/leave/LeaveListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/leave/LeaveListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.paymentList',
                {
                    url: '/approve/payment',

                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/payment/PaymentList.html'),
                            controller: 'paymentListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/payment/PaymentListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/payment/PaymentListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.overtimeList',
                {
                    url: '/approve/overtime',

                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/overtime/OvertimeList.html'),
                            controller: 'overtimeListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/overtime/OvertimeListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/overtime/OvertimeListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })

            .state('app.auditDetail',
                {
                    url: '/approve/auditDetail',
                    params: {
                        type:0,//11:一般请假、调整单 12:取消单 13:加班 14:加班取消 15:物资采购 16:物资申领 21:入院最终审核 22:退院审核  23:退院确认 24:床位调整 25:付款计划 26:护理等级调整
                        auditResult:1, //0:拒绝 1:同意
                        inputParam:{}
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/auditDetail/AuditDetail.html'),
                            controller: 'auditDetailController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/auditDetail/AuditDetailController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })

            .state('app.purchaseAuditList',
                {
                    url: '/approve/materialPurchase',

                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/materialPurchase/PurchaseList.html'),
                            controller: 'purchaseListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/materialPurchase/PurchaseListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/materialPurchase/PurchaseListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })

            .state('app.paymentInfo',
                {
                    url: '/approve/paymentInfo',
                    params: {
                        paymentPlanId:0,
                        personId:0
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/paymentInfo/PaymentInfo.html'),
                            controller: 'paymentInfoController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [

                                                MobilePublic.getServerUrl('app/approve/paymentInfo/PaymentInfoController.js')

                                            ]
                                        }
                                    ]);
                                }
                            }


                        }
                    }

                })

            .state('app.applyAuditList',
                {
                    url: '/approve/materialApply',

                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/materialApply/ApplyList.html'),
                            controller: 'applyListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/materialApply/ApplyListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/materialApply/ApplyListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.bedAdjustList',
                {
                    url: '/approve/bedAdjust',

                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/bedAdjust/BedAdjustList.html'),
                            controller: 'bedAdjustListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/bedAdjust/BedAdjustListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/bedAdjust/BedAdjustListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.serviceAdjustList',
                {
                    url: '/approve/service',

                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/service/ServiceAdjustList.html'),
                            controller: 'serviceAdjustListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/service/ServiceAdjustListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/service/ServiceAdjustListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.serviceItemInfo',
                {
                    url: '/approve/serviceItemInfo',
                    params: {
                        serviceItem:[],
                        flag:0,
                        careRankName:"",
                        packageName:"",
                        personName:""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/serviceItemInfo/ServiceItemInfo.html'),
                            controller: 'serviceItemInfoController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [

                                                MobilePublic.getServerUrl('app/approve/serviceItemInfo/ServiceItemInfoController.js')

                                            ]
                                        }
                                    ]);
                                }
                            }


                        }
                    }

                })
            .state('app.checkOutList',
                {
                    url: '/approve/checkOut',

                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/checkOut/CheckOutList.html'),
                            controller: 'checkOutListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/checkOut/CheckOutListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/checkOut/CheckOutListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.goOutConfirmList',
                {
                    url: '/approve/goOutConfirm',

                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/goOutConfirm/GoOutConfirmList.html'),
                            controller: 'goOutConfirmListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/goOutConfirm/GoOutConfirmListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/goOutConfirm/GoOutConfirmListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.goInHospitalList',
                {
                    url: '/approve/goInHospital',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/goInHospital/GoInHospitalList.html'),
                            controller: 'goInHospitalListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/goInHospital/GoInHospitalListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/goInHospital/GoInHospitalListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.applyGoInHospitalInfo',
                {
                    url: '/approve/applyInHospitalInfo',
                    params: {
                        param:{}
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/applyInHospitalInfo/ApplyInHospitalInfo.html'),
                            controller: 'applyInHospitalInfoController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [

                                                MobilePublic.getServerUrl('app/approve/applyInHospitalInfo/ApplyInHospitalInfoController.js')

                                            ]
                                        }
                                    ]);
                                }
                            }


                        }
                    }

                })
            .state('app.evaluateGoInHospitalInfo',
                {
                    url: '/approve/evaluateInHospitalInfo',
                    params: {
                        param:{},
                        accessDiv:1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/evaluateInHospitalInfo/EvaluateInHospitalInfo.html'),
                            controller: 'evaluateInHospitalInfoController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [

                                                MobilePublic.getServerUrl('app/approve/evaluateInHospitalInfo/EvaluateInHospitalInfoController.js')

                                            ]
                                        }
                                    ]);
                                }
                            }


                        }
                    }

                })
            .state('app.examGoInHospitalInfo',
                {
                    url: '/approve/examInHospitalInfo',
                    params: {
                        param:{},
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/examInHospitalInfo/ExamInHospitalInfo.html'),
                            controller: 'examInHospitalInfoController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [

                                                MobilePublic.getServerUrl('app/approve/examInHospitalInfo/ExamInHospitalInfoController.js')

                                            ]
                                        }
                                    ]);
                                }
                            }


                        }
                    }

                })
            .state('app.paymentInHospitalInfo',
                {
                    url: '/approve/paymentInHospitalInfo',
                    params: {
                        allPlanList:[],
                        contractTypeName:"",
                        personName:""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/paymentInHospitalInfo/PaymentInHospitalInfo.html'),
                            controller: 'paymentInHospitalInfoController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [

                                                MobilePublic.getServerUrl('app/approve/paymentInHospitalInfo/PaymentInHospitalInfoController.js')

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