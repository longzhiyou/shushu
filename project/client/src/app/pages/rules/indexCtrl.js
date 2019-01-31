/**
 * @author
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rules')
      .controller('rulesIndexCtrl', indexCtrl);

  /** @ngInject */
  function indexCtrl($state, Restangular,warningModalService,halService) {

    var vm = this;

     vm.typeList=[
         {title: '全部', value: 0},
         {title: '分析', value: 1},
         {title: '过滤', value: 2}
     ];

    vm.halService = halService;

    vm.edit = edit;
    vm.destroy = destroy;


     vm.rules = [];
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
              match:match
          };

          Restangular.all('rules').customGET("search/filter",pagination).then(function(response) {


              vm.rules = halService.getList("rules",response);

              tableState.pagination.numberOfPages = response.page.totalPages;//set the number of pages so the pagination can update
              tableState.pagination.totalItemCount = response.page.totalElements;



          }, function(error) {

          });


      };


    function edit(item){

      $state.go('rules.edit',{
          id:halService.getId(item)
      });
    }

    function destroy(item){

        warningModalService.open(item).result.then(function(item) {
            //以后直接复制
            Restangular.one('rules',halService.getId(item)).remove().then(
                function(hal) {
                    vm.loadData();
            });

        });

    }



  }

})();
