/**
 * @author longzhiyou
 * created on 10.18.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sys', [
      'BlurAdmin.pages.sys.customer',
      'BlurAdmin.pages.sys.user'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('sys', {
          url: '/sys',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '系统设置',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 100
          }
        })


    ;
    // $urlRouterProvider.when('/mattresses','/mattresses/index');
  }

})();
