/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customers')
      .controller('customersIndexCtrl', indexCtrl)
      .directive('stPersist', function () {
          return {
              require: '^stTable',
              link: function (scope, element, attr, ctrl) {
                  var nameSpace = attr.stPersist;

                  //save the table state every time it changes
                  scope.$watch(function () {
                      return ctrl.tableState();
                  }, function (newValue, oldValue) {
                      if (newValue !== oldValue) {
                          localStorage.setItem(nameSpace, JSON.stringify(newValue));
                      }
                  }, true);

                  //fetch the table state when the directive is loaded
                  if (localStorage.getItem(nameSpace)) {
                      var savedState = JSON.parse(localStorage.getItem(nameSpace));
                      var tableState = ctrl.tableState();

                      angular.extend(tableState, savedState);
                      ctrl.pipe();

                  }

              }
          };
      });
  ;

  /** @ngInject */
  function indexCtrl($state, Restangular,warningModalService,halService) {


    var vm = this;
    vm.halService = halService;

    vm.edit = edit;
    vm.detail = detail;

    vm.destroy = destroy;

    vm.multipleSelectItems = [];
    vm.rules=[];
    vm.customers = [];
      vm.match="";


      vm.matchRule=function(){

          var ids=[];
          for(var i  = 0; i < vm.multipleSelectItems.length; i++) {
              ids.push(halService.getId(vm.multipleSelectItems[i]));
          }
          var filter  = JSON.stringify(ids);
          // filter = ids.join(",");

          Restangular.all('bazis').getList({filter: filter}).then(function(customers) {

              vm.customers = customers;
          });

      };
      vm.callServer = function callServer(tableState) {

          var number = tableState.pagination.number || 10;  // Number of entries showed per page.

          var start = tableState.pagination.start || 0;

          var match = "";
          if (tableState.search.predicateObject&&tableState.search.predicateObject["match"]) {
              match =tableState.search.predicateObject["match"];
          }


          var pagination = {
              page:start/number,
              size:number,
              match:match,
          };

          Restangular.all('customers').customGET("search/filter",pagination).then(function(response) {


              vm.customers = halService.getList("customers",response);

              tableState.pagination.numberOfPages = response.page.totalPages;//set the number of pages so the pagination can update
              tableState.pagination.totalItemCount = response.page.totalElements;

              if (vm.rules.length<=0) {
                  Restangular.all('rules/search/combox').customGET().then(function(response) {
                      vm.rules = halService.getList("rules",response);
                  }, function(error) {

                  });

              }

          }, function(error) {

          });


      };

    // function loadData(){
    //
    //
    //     Restangular.all('rules/search/combox').customGET().then(function(response) {
    //         vm.rules = halService.getList("rules",response);
    //
    //         //customGET
    //         Restangular.all('customers').customGET().then(function(response) {
    //
    //             // var list = halService.getList("customers",response);
    //
    //             // vm.customers =list.slice(0,25);
    //             vm.customers = halService.getList("customers",response);
    //
    //
    //         }, function(error) {
    //
    //         });
    //
    //
    //     }, function(error) {
    //
    //     });
    //
    //
    // }


  // vm.study = function (item){
  //
  //     $state.go('customers.study',{
  //         customer:item
  //     });
  // };

  function detail(item){

      $state.go('customers.detail',{
          id:halService.getId(item)
      });
  }

    function edit(item){

      $state.go('customers.edit',{
          id:halService.getId(item)
      });
    }

    function destroy(item){

        warningModalService.open(item).result.then(function(item) {
            //以后直接复制
            Restangular.one('customers',halService.getId(item)).remove().then(
                function(hal) {
                    vm.loadData();
            });

        });

    }


    // function init(){
    //
    //   loadData();
    // }
    // init();


  }

})();
