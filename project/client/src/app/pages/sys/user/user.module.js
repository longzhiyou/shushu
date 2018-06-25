/**
 * @author longzhiyou
 * created on 10.18.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sys.user', [
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('sys.user', {
          url: '/users',
          abstract: true,
          title: '用户管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 100
          }
        }).state('sys.user.index', {
          url: '',
          templateUrl: 'app/pages/mattresses/index.html',
          controller: 'indexCtrl',
          controllerAs: 'vm',
          title: '用户一览',
          sidebarMeta: {
              icon: 'ion-grid',
                order: 0
          }
        })

    ;
    $urlRouterProvider.when('/user','/user/index');
  }

})();
