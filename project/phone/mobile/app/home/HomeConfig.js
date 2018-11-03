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
    angular.module("app").config(HomeConfig);

    /* @ngInject */
    function HomeConfig($stateProvider) {

        $stateProvider
            .state('app.evaluateMenu',
                {
                    url: '/evaluateMenu',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/home/evaluateMenu/EvaluateMenu.html'),
                            controller: 'evaluateMenuController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/home/evaluateMenu/EvaluateMenuConfig.js')
                                                ,MobilePublic.getServerUrl('app/home/evaluateMenu/EvaluateMenuController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.servicePersonList',
                {
                    url: '/servicePersonList',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceImplementation/ServicePersonList.html'),
                            controller: 'servicePersonListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceImplementation/ServicePersonListConfig.js')
                                                ,MobilePublic.getServerUrl('app/serviceImplementation/ServicePersonListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.memberList',
                {
                    url: '/memberList',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/member/MemberList.html'),
                            controller: 'memberListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/member/MemberListConfig.js')
                                                ,MobilePublic.getServerUrl('app/member/MemberListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.serviceSearchPersonList',
                {
                    url: '/serviceSearchPersonList',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceSearch/ServiceSearchPersonList.html'),
                            controller: 'serviceSearchPersonListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceSearch/ServiceSearchPersonListConfig.js')
                                                ,MobilePublic.getServerUrl('app/serviceSearch/ServiceSearchPersonListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.serviceAllSearchMenu',
                {
                    url: '/serviceAllSearchMenu',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceAllSearchMenu/ServiceAllSearchMenu.html'),
                            controller: 'serviceAllSearchMenuController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceAllSearchMenu/ServiceAllSearchMenuConfig.js')
                                                ,MobilePublic.getServerUrl('app/serviceAllSearchMenu/ServiceAllSearchMenuController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })

            .state('app.pay',
                {
                    url: '/pay',
                    params: {
                        type: 1,
                        dealNo:[]
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/fee/Fee.html'),
                            controller: 'feeController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/fee/FeeConfig.js')
                                                ,MobilePublic.getServerUrl('app/fee/FeeController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.health',
                {
                    url: '/health',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/health/SelectMember.html'),
                            controller: 'healthController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/health/HealthConfig.js')
                                                ,MobilePublic.getServerUrl('app/health/HealthController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.alipay',
                {
                    url: '/alipay',
                    params: {
                        id: 1,
                        type: "1"
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/alipay/Alipay.html'),
                            controller: 'alipayController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/alipay/AlipayConfig.js')
                                                ,MobilePublic.getServerUrl('app/alipay/AlipayController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })

            .state('app.wxpay',
                {
                    url: '/wxpay',
                    params: {
                        id: 1,
                        type: "1"
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/wxpay/Wxpay.html'),
                            controller: 'wxpayController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/wxpay/WxpayConfig.js')
                                                ,MobilePublic.getServerUrl('app/wxpay/WxpayController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.changeInstitute',
                {
                    url: '/home/changeInstitute',
                    params: {
                        id: 1,
                        type: "1"
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/changeInstitute/ChangeInstitute.html'),
                            controller: 'changeInstituteController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/changeInstitute/ChangeInstituteController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.staticAnalyze',
                {
                    url: '/staticAnalyze',
                    params: {
                        id: 1,
                        type: "1"
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/staticAnalyze/StaticAnalyze.html'),
                            controller: 'staticAnalyzeController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/staticAnalyze/StaticAnalyzeController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.intentionality',
                {
                    url: '/intentionalityList',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/intentionalityCustomer/IntentionalityCustomerList.html'),
                            controller: 'intentionalityCustomerListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/intentionalityCustomer/IntentionalityCustomerListConfig.js')
                                                ,MobilePublic.getServerUrl('app/intentionalityCustomer/IntentionalityCustomerListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.approve',
                {
                    url: '/approve',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/approve/ApproveList.html'),
                            controller: 'approveListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/approve/ApproveListConfig.js')
                                                ,MobilePublic.getServerUrl('app/approve/ApproveListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.serviceMenu',
                {
                    url: '/serviceMenu',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/serviceMenu/ServiceMenu.html'),
                            controller: 'serviceMenuController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/serviceMenu/ServiceMenuController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.staffList',
                {
                    url: '/staffList',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/staff/StaffList.html'),
                            controller: 'staffListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/staff/StaffListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            .state('app.shiftPersonList',
                {
                    url: '/shiftPersonList',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/shift/ShiftPersonList.html'),
                            controller: 'shiftPersonListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/shift/ShiftPersonListConfig.js')
                                                , MobilePublic.getServerUrl('app/shift/ShiftPersonListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }
                })
            .state('app.dutyRoster',
                {
                    url: '/dutyRoster',
                    params: {
                        accessDiv: 1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/dutyRoster/DutyRoster.html'),
                            controller: 'dutyRosterController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/dutyRoster/DutyRosterController.js')
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