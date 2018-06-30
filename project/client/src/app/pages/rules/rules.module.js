/**
 * @author longzhiyou
 * created on 10.18.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rules', [
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('rules', {
          url: '/rules',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '规则管理',
          sidebarMeta: {
            icon: 'fa fa-bed',
            order: 1
          }
        }).state('rules.index', {
          url: '',
          templateUrl: 'app/pages/rules/index.html',
          controller: 'rulesIndexCtrl',
          controllerAs: 'vm',
          title: '规则一览',
          sidebarMeta: {
                order: 0
          }
        })
        .state('rules.new', {
            url: '/new',
            templateUrl: 'app/pages/rules/modify.html',
            controller: 'rulesModifyCtrl',
            controllerAs: 'vm',
            title: '新增规则',
            sidebarMeta: {
                order: 1
            }

        })
        .state('rules.edit', {
            url: '/:id/edit',

            templateUrl: 'app/pages/rules/modify.html',
            controller: 'rulesModifyCtrl',
            controllerAs: 'vm',
            title: '编辑规则'

        })


    ;
    $urlRouterProvider.when('/rules','/rules/index');
  }

})();
