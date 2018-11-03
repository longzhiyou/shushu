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
    angular.module("app").config(ShiftPersonListConfig);

    /* @ngInject */
    function ShiftPersonListConfig($stateProvider) {

        $stateProvider
            .state('app.shiftMemo',
                {
                    url: '/shift/shiftMemo',
                    params: {
                        memberId: 1,
                        accessDiv: 2,
                        staffScheduleId:"",
                        infos:{}
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/shift/shiftMemo/ShiftMemo.html'),
                            controller: 'shiftMemoController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/shift/shiftMemo/ShiftMemoController.js')
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