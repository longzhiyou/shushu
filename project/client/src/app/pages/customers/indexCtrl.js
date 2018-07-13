/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customers')
      .controller('customersIndexCtrl', indexCtrl);

  /** @ngInject */
  function indexCtrl($state,$http, $uibModal, Restangular, DTOptionsBuilder,
                     DTColumnDefBuilder,defaultOptionsDom,warningModalService
                     ,halService,promptService

  ) {

    var vm = this;
    var idName = "customerId";

    vm.halService = halService;

    vm.edit = edit;
    vm.detail = detail;

    vm.destroy = destroy;
    vm.loadData = loadData;


      vm.multipleSelectItems = [];

      vm.rules=[];

      vm.customers = [];
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDOM(defaultOptionsDom)
        .withButtons([
            {
                text: '新增',
                className: 'btn btn-primary',
                key: '1',
                action: function (e, dt, node, config) {
                    $state.go('customers.new');
                }
            },
            {
                text: '匹配规则',
                className: 'btn btn-info',
                key: '2',
                action: function (e, dt, node, config) {

                    var ids=[];
                    for(var i  = 0; i < vm.multipleSelectItems.length; i++) {
                        ids.push(halService.getId(vm.multipleSelectItems[i]));
                    }
                    var filter  = JSON.stringify(ids);
                    // filter = ids.join(",");

                    Restangular.all('bazis').getList({filter: filter}).then(function(customers) {

                        vm.customers = customers;
                    });



                }
            }
        ])
    ;
    vm.dtColumnDefs = [
      // DTColumnDefBuilder.newColumnDef(0).withClass('select-checkbox').renderWith(function() {return '';}),
      DTColumnDefBuilder.newColumnDef(0).withClass('text-danger'),
      // DTColumnDefBuilder.newColumnDef(1),
      // DTColumnDefBuilder.newColumnDef(2),
      // DTColumnDefBuilder.newColumnDef(3),
      // DTColumnDefBuilder.newColumnDef(4),
      DTColumnDefBuilder.newColumnDef(5).notVisible()

    ];


    function loadData(){


        //customGET
        Restangular.all('customers/search/grid').customGET().then(function(response) {

            vm.customers =halService.getList("customers",response,"customerId");


            Restangular.all('rules/search/combox').customGET().then(function(response) {
                vm.rules = halService.getList("rules",response);

            }, function(error) {

            });

        }, function(error) {

        });

    }


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


    function init(){

      loadData();
    }
    init();


  }

})();
