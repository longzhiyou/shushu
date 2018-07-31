/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customers')
      .controller('customersIndexCtrl', indexCtrl);

  /** @ngInject */
  function indexCtrl($scope,$state, Restangular, DTOptionsBuilder,
                     DTColumnDefBuilder,defaultOptionsDom,warningModalService,halService,dataService

  ) {


    var vm = this;

      vm.itemsByPage=10;


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
      DTColumnDefBuilder.newColumnDef(5).notVisible(),
      DTColumnDefBuilder.newColumnDef(6).notVisible()

    ];


    function loadData(){


        Restangular.all('rules/search/combox').customGET().then(function(response) {
            vm.rules = halService.getList("rules",response);

            // var customers = dataService.get("customers");
            // if(customers){
            //
            //     vm.customers = customers;
            //     return;
            // }
            //customGET
            Restangular.all('customers').customGET().then(function(response) {

                // var list = halService.getList("customers",response);

                // vm.customers =list.slice(0,25);
                vm.customers = halService.getList("customers",response);



                // dataService.set("customers",vm.customers);
                
            }, function(error) {

            });


        }, function(error) {

        });


    }


  vm.study = function (item){

      $state.go('customers.study',{
          customer:item
      });
  };

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
