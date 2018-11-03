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
    angular.module("app").config(PersonEvaluateZfcConfig);

    /* @ngInject */
    function PersonEvaluateZfcConfig($stateProvider) {

        $stateProvider

            .state('app.evaluateDetailZfc',
                {
                    url: '/evaluateList/evaluateHistory/personEvaluateZfc/evaluateDetailZfc',
                    params: {
                        itemType: 1,
                        evaluateType: 2,
                        data:3
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateZfc/evaluateDetailZfc/EvaluateDetailZfc.html'),
                            controller: 'evaluateDetailZfcController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                  MobilePublic.getServerUrl('app/evaluate/evaluateHistory/personEvaluateZfc/evaluateDetailZfc/EvaluateDetailZfcController.js')
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