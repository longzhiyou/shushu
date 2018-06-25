/**
 * @author longzhiyou
 * created on 10.18.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customers', [
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('customers', {
          url: '/customers',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '客户管理',
          sidebarMeta: {
            icon: 'fa fa-bed',
            order: 1
          }
        }).state('customers.index', {
          url: '',
          templateUrl: 'app/pages/customers/index.html',
          controller: 'customersIndexCtrl',
          controllerAs: 'vm',
          title: '客户一览',
          sidebarMeta: {
                order: 0
          }
        })
        .state('customers.new', {
            url: '/new',
            templateUrl: 'app/pages/customers/modify.html',
            controller: 'customersModifyCtrl',
            controllerAs: 'vm',
            title: '新增客户',
            sidebarMeta: {
                order: 1
            }

        })
        // .state('customers.detail', {
        //     url: '/:id',
        //     templateUrl: 'app/pages/customers/detail.html',
        //     controller: 'detailCtrl',
        //     controllerAs: 'vm',
        //     title: '详情床垫'
        //
        // })
        .state('customers.edit', {
            url: '/:id/edit',
            // params:{
            //     selfLink:null
            // },
            templateUrl: 'app/pages/customers/modify.html',
            controller: 'customersModifyCtrl',
            controllerAs: 'vm',
            title: '编辑客户'

        })



    ;
    $urlRouterProvider.when('/customers','/customers/index');
  }

})();
