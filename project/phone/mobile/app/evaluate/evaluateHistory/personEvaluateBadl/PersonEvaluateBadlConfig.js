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
    angular.module("app").config(PersonEvaluateBadlConfig);

    /* @ngInject */
    function PersonEvaluateBadlConfig($stateProvider) {

        $stateProvider

            .state('app.evaluateDetailBadl',
                {
                    url: '/evaluateList/evaluateHistory/personEvaluateBadl/evaluateDetailBadl',
                    params: {
                        itemType: 1,
                        evaluateType: 2,
                        data:3
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateBadl/evaluateDetailBadl/EvaluateDetailBadl.html'),
                            controller: 'evaluateDetailBadlController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                  MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateBadl/evaluateDetailBadl/EvaluateDetailBadlController.js')
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