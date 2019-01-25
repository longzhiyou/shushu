/**
 * @author longzhiyou
 * created on 10.18.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.labels', [
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('labels', {
          url: '/labels',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '标签管理',
          sidebarMeta: {
            icon: 'fa  fa-magic',
            order: 1
          }
        }).state('labels.index', {
          url: '',
          templateUrl: 'app/pages/labels/index.html',
          controller: 'labelsIndexCtrl',
          controllerAs: 'vm',
          title: '标签一览',
          sidebarMeta: {
                order: 0
          }
        })
        .state('labels.new', {
            url: '/new',
            templateUrl: 'app/pages/labels/modify.html',
            controller: 'labelsModifyCtrl',
            controllerAs: 'vm',
            title: '新增标签',
            sidebarMeta: {
                order: 1
            }

        })
        .state('labels.edit', {
            url: '/:id/edit',

            templateUrl: 'app/pages/labels/modify.html',
            controller: 'labelsModifyCtrl',
            controllerAs: 'vm',
            title: '编辑标签'

        })


    ;
    $urlRouterProvider.when('/labels','/labels/index');
  }

})();
