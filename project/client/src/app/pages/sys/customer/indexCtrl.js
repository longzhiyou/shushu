/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mattresses')
      .controller('indexCtrl', indexCtrl);

  /** @ngInject */
  function indexCtrl($state, Restangular, DTOptionsBuilder, DTColumnDefBuilder,defaultOptionsDom) {

    var vm = this;

    vm.edit = edit;
    vm.destroy = destroy;
    vm.loadData = loadData;



    vm.mattresses = [];
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDOM(defaultOptionsDom)
        .withButtons([
            {
                text: '新增',
                className: 'btn btn-primary',
                key: '1',
                action: function (e, dt, node, config) {
                    $state.go('mattresses.new');
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
      DTColumnDefBuilder.newColumnDef(2),
      DTColumnDefBuilder.newColumnDef(3),
      DTColumnDefBuilder.newColumnDef(4).notSortable()

    ];

    function loadData(){

      Restangular.all('mattresses').getList().then(function(mattresses) {
        vm.mattresses = mattresses;
      });
    }


    function edit(index){
      $state.go('mattresses.edit',{"id":vm.mattresses[index].deviceId});
    }

    function destroy(index){
        Restangular.one('/mattresses',vm.mattresses[index].deviceId).remove().then(function(mattress) {
            vm.loadData();
        });

    }
    //
    //function add() {
    //  //vm.mattresses.push(angular.copy(vm.Customer2Add));
    //  //vm.Customer2Add = _buildCustomer2Add(vm.Customer2Add.id + 1);
    //}
    //function modify(index) {
    //
    //}
    //function remove(index) {
    //  //vm.mattresses.splice(index, 1);
    //}


    function init(){
      loadData();
    }
    init();


  }

})();
