/**
 * @author lzy
 * created on 2017-04-17
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.labels')
      .controller('rulesModifyCtrl', ModifyCtrl);

  /** @ngInject */
  function ModifyCtrl($stateParams, $state,Restangular,promptService,setting) {

    var vm = this;
    vm.id=$stateParams.id>0?$stateParams.id:0;
      
    
      vm.rule={};


      function uiInit() {
          vm.rule={

          };

      }

      vm.save=save;
    function save() {

        Restangular.one("rules",vm.id).customPUT(vm.rule).then(function(response) {
            promptService.success(setting.saveSuccess);
        }, function(error) {
            promptService.failure(setting.saveError);

        });


    }

    vm.add= function(goIndex) {


          Restangular.all('rules').post(vm.rule).then(function(hal) {
              // console.log( rule );
              if (goIndex) {
                  $state.go('rules.index');
              }else {
                  //清空
                  uiInit();
                  promptService.success(setting.saveSuccess);
              }

          }, function(error) {
              promptService.failure(error.data.meta.message);

          });
      };

    function init(){
        if (vm.id>0) {
            Restangular.one("rules",vm.id).get().then(function(hal) {
                vm.rule = hal;
            }, function(error) {
                promptService.failure(setting.getDataError);

            });

        }

    }

      vm.back = back;
      function back() {
          $state.go('rules.index');
      }

    init();

  }

})();
