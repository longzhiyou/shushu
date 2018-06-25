/**
 * @author longzhiyou
 * created on 10.18.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.machines', [
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('machines', {
          url: '/machines',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '健康一体机',
          sidebarMeta: {
            icon: 'ion-ios-pulse-strong',
            order: 50
          }
        }).state('machines.index', {
            url: '',
            templateUrl: 'app/pages/mattresses/index.html',
            controller: 'mattressesIndexCtrl',
            controllerAs: 'vm',
            title: '健康一体机一览',
            sidebarMeta: {
                order: 0
            }
        })

        .state('machines.new', {
            url: '/new',
            templateUrl: 'app/pages/mattresses/modify.html',
            controller: 'mattressesModifyCtrl',
            controllerAs: 'vm',
            title: '新增健康一体机',
            sidebarMeta: {
                order: 1
            }

        })




    ;
    //$urlRouterProvider.when('/mattresses','/mattresses/index');
  }

})();
