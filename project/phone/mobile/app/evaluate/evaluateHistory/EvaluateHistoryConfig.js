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
    angular.module("app").config(EvaluateHistoryConfig);

    /* @ngInject */
    function EvaluateHistoryConfig($stateProvider) {

        $stateProvider

            .state('app.personEvaluateJap',
                {
                    url: '/evaluateList/evaluateHistory/personEvaluateJap',
                    params: {
                        personId: 1,
                        accessDiv: 2,
                        id:0,
                        applyId:-1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateJap/PersonEvaluateJap.html'),
                            controller: 'personEvaluateJapController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateJap/PersonEvaluateJapConfig.js'),
                                                MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateJap/PersonEvaluateJapController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }



                })
            .state('app.personEvaluateZfc',
                {
                    url: '/evaluateList/evaluateHistory/personEvaluateZfc',
                    params: {
                        personId: 1,
                        accessDiv: 2,
                        id:0,
                        applyId:-1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateZfc/PersonEvaluateZfc.html'),
                            controller: 'personEvaluateZfcController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateZfc/PersonEvaluateZfcConfig.js'),
                                                MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateZfc/PersonEvaluateZfcController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }



                })
            .state('app.personEvaluateBadl',
                {
                    url: '/evaluateList/evaluateHistory/personEvaluateBadl',
                    params: {
                        personId: 1,
                        accessDiv: 2,
                        id:0,
                        applyId:-1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateBadl/PersonEvaluateBadl.html'),
                            controller: 'personEvaluateBadlController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateBadl/PersonEvaluateBadlConfig.js'),
                                                MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateBadl/PersonEvaluateBadlController.js')
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