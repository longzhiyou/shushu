/**
 * @author longzhiyou
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [

      'BlurAdmin.pages.customers'

  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider ) {
    $urlRouterProvider.otherwise('/customers');


  }

})();
