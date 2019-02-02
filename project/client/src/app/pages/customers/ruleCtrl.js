/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customers')
      .controller('customersRuleIndexCtrl', indexCtrl);

  /** @ngInject */
  function indexCtrl($state, Restangular,warningModalService,halService) {

    var vm = this;
      vm.multipleSelectItems = [];

    vm.edit = edit;
    vm.destroy = destroy;
     vm.clickFilter=clickFilter;

      vm.rules=[];
      vm.customers = [];

     function clickFilter() {

         var ids=[];
         for(var i  = 0; i < vm.multipleSelectItems.length; i++) {
             ids.push(vm.multipleSelectItems[i].id);
         }
         var filter  = JSON.stringify(ids);

         Restangular.all('bazis').getList({filter: filter}).then(function(customers) {
             vm.customers = customers;

         });

         // Restangular.all('labels/filter').getList({ids: filter}).then(function(response) {
         //     vm.customers = response;
         //
         // }, function(error) {
         //
         // });
     }

      function getRules() {

          if (vm.rules.length<=0) {
              Restangular.all('rules/combox').getList().then(function(response) {
                  vm.rules = response;
              }, function(error) {

              });

          }


          // Restangular.all('labels').getList().then(function(response) {
          //     vm.rules = response;
          //
          // }, function(error) {
          //
          // });


      };


    function edit(item){

    }

    function destroy(item){

    }


      function init(){

          getRules();
      }
      init();



  }

})();
