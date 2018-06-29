/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rules')
      .controller('rulesIndexCtrl', indexCtrl);

  /** @ngInject */
  function indexCtrl($state,$http, $uibModal, Restangular, DTOptionsBuilder,
                     DTColumnDefBuilder,defaultOptionsDom,warningModalService
                     ,halService,promptService

  ) {

    var vm = this;
    var idName = "customerId";

    vm.halService = halService;

    vm.edit = edit;
    vm.destroy = destroy;
    vm.loadData = loadData;


      vm.multipleSelectItems = [];
      // vm.multipleSelectItems = [
      //     {title: '年禄', value: '1011153728809467904'},
      //     {title: '天乙贵人', value: '1011154965567111168'},
      //     {title: '纳音五行正印', value: '1011155031212163072'}
      // ];

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
            },
            {
                text: '过滤',
                className: 'btn btn-info',
                key: '2',
                action: function (e, dt, node, config) {

                    if (vm.multipleSelectItems.length>0) {
                        var ids=[];

                        for(var i  = 0; i < vm.multipleSelectItems.length; i++) {
                            var select = halService.getId(vm.multipleSelectItems[i]);
                            ids.push(select);
                        }

                        var filter  = JSON.stringify(ids);
                        // filter = ids.join(",");

                        Restangular.all('bazis').getList({filter: filter}).then(function(accounts) {

                            var allAccounts = accounts;
                        });



                    }



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

            Restangular.all('rules').customGET().then(function(hal) {
                // vm.rules = hal._embedded["rules"];
                vm.rules = halService.getList("rules",hal);

            }, function(error) {

            });

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
