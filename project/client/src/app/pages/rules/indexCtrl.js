/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rules')
      .controller('rulesIndexCtrl', indexCtrl);

  /** @ngInject */
  function indexCtrl($state, Restangular, DTOptionsBuilder,
                     DTColumnDefBuilder,defaultOptionsDom,warningModalService
                     ,halService,promptService

  ) {

    var vm = this;
    var idName = "id";

    vm.halService = halService;

    vm.edit = edit;
    vm.destroy = destroy;
    vm.loadData = loadData;


      vm.rules=[];

      vm.rules = [];
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDOM(defaultOptionsDom)
        .withButtons([
            {
                text: '新增',
                className: 'btn btn-primary',
                key: '1',
                action: function (e, dt, node, config) {
                    $state.go('rules.new');
                }
            }
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
        Restangular.all('rules').customGET().then(function(hal) {
            // vm.rules = hal._embedded["rules"];
            vm.rules = halService.getList("rules",hal,idName);

        }, function(error) {

        });

    }


    function edit(item){

      $state.go('rules.edit',{
          id:halService.getId(item,idName)
      });
    }

    function destroy(item){

        warningModalService.open(item).result.then(function(item) {
            //以后直接复制
            Restangular.one('rules',halService.getId(item,idName)).remove().then(
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
