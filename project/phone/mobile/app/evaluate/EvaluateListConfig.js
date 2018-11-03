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
    angular.module("app").config(EvaluateListConfig);

    /* @ngInject */
    function EvaluateListConfig($stateProvider) {

        $stateProvider

            .state('app.evaluateHistory',
                {
                    url: '/evaluateList/evaluateHistory',
                    params: {
                        personId: 1,
                        accessDiv: 2
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/evaluate/evaluateHistory/EvaluateHistory.html'),
                            controller: 'evaluateHistoryController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/evaluate/evaluateHistory/EvaluateHistoryConfig.js'),
                                                MobilePublic.getServerUrl('app/evaluate/evaluateHistory/EvaluateHistoryController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }



                })

            .state('app.evaluateRcyHistory',
                {
                    url: '/evaluateList/evaluateRcyHistory',
                    params: {
                        personId: 1,
                        accessDiv: 2,
                        applyId:0,
                        path:''
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/evaluate/evaluateRcyHistory/EvaluateRcyHistory.html'),
                            controller: 'evaluateRcyHistoryController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/evaluate/evaluateHistory/EvaluateHistoryConfig.js'),
                                                MobilePublic.getServerUrl('app/evaluate/evaluateRcyHistory/EvaluateRcyHistoryController.js')
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