/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.labels')
      .controller('labelsIndexCtrl', indexCtrl);

  /** @ngInject */
  function indexCtrl($state, Restangular,warningModalService) {

    var vm = this;
      vm.multipleSelectItems = [];

    vm.edit = edit;
    vm.destroy = destroy;
     vm.clickFilter=clickFilter;

     vm.labels = [];
      vm.customers = [];

     function clickFilter() {

         var ids=[];
         for(var i  = 0; i < vm.multipleSelectItems.length; i++) {
             ids.push(vm.multipleSelectItems[i].id);
         }
         var filter  = JSON.stringify(ids);

         Restangular.all('labels/filter').getList({ids: filter}).then(function(response) {
             vm.customers = response;

         }, function(error) {

         });
     }

      function getLabels() {


          Restangular.all('labels').getList().then(function(response) {
              vm.labels = response;

          }, function(error) {

          });


      };


    function edit(item){

    }

    function destroy(item){

    }


      function init(){

        getLabels();
      }
      init();



  }

})();
