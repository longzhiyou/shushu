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
            .state('app.evaluateList',
                {
                    url: '/evaluateList',
                    params: {
                        accessDiv: 1,
                        type:1
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/evaluate/EvaluateList.html'),
                            controller: 'evaluateListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/evaluate/EvaluateListConfig.js')
                                                ,MobilePublic.getServerUrl('app/evaluate/EvaluateListController.js')
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