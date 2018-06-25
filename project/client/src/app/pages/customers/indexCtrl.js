/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customers')
      .controller('customersIndexCtrl', indexCtrl);

  /** @ngInject */
  function indexCtrl($state, Restangular, DTOptionsBuilder,
                     DTColumnDefBuilder,defaultOptionsDom,warningModalService
                     ,halService,promptService

  ) {

    var vm = this;
    vm.halService = halService;

    vm.edit = edit;
    vm.destroy = destroy;
    vm.loadData = loadData;



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
          'copy',
          'csv',
          'print'
        ])
    ;
    vm.dtColumnDefs = [
      // DTColumnDefBuilder.newColumnDef(0).withClass('select-checkbox').renderWith(function() {return '';}),
      DTColumnDefBuilder.newColumnDef(0).withClass('text-danger'),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2).notSortable()

    ];


    function loadData(){

        //customGET
        Restangular.all('customers').customGET().then(function(hal) {
            vm.customers = hal._embedded.customers;

        }, function(error) {
            promptService.failure(setting.getDataError);

        });

    }


    function edit(item){

        // var id = halService.getId(item);
      $state.go('customers.edit',{
          id:halService.getId(item)
          // ,selfLink:halService.getSelfLink(item)
      });
    }

    function destroy(item){

        warningModalService.open(item).result.then(function(item) {
            //以后直接复制
            Restangular.oneUrl('hal',halService.getSelfLink(item)).remove().then(function(hal) {
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
