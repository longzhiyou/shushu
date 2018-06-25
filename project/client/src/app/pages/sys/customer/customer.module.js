/**
 * @author longzhiyou
 * created on 10.18.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sys.customer', [
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('sys.customer', {
          url: '/customer',
          // template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
            parent: 'sys',
          title: '客户管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 100
          }
        }).state('sys.customer.index', {
          url: '',
          templateUrl: 'app/pages/mattresses/index.html',
          controller: 'indexCtrl',
          controllerAs: 'vm',
          title: '客户一览',
          sidebarMeta: {
              icon: 'ion-grid',
                order: 0
          }
        })

    ;
    $urlRouterProvider.when('/customer','/customer/index');
  }

})();
