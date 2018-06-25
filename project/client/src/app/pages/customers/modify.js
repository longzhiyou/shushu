/**
 * @author lzy
 * created on 2017-04-17
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customers')
      .controller('customersModifyCtrl', ModifyCtrl);

  /** @ngInject */
  function ModifyCtrl($stateParams, $state,Restangular,promptService,setting) {

    var vm = this;
    vm.id=$stateParams.id>0?$stateParams.id:0;
    // vm.selfLink=$stateParams.selfLink;
    // vm._links =null;

      vm.customer={};


      function uiInit() {


      }

      function setSelect() {

      }

    vm.save=save;
    function save() {
        setSelect();
        // vm.customer.id = vm.id;
        // vm.customer.put().then(function(hal) {
        //     // $state.go('customers.index');
        // });

        Restangular.one("customers",vm.id).customPUT(vm.customer).then(function(hal) {
            $state.go('customers.index');
        });

        // Restangular.oneUrl("customers",vm.id).customPUT(vm.customer).then(function(hal) {
        //     // $state.go('customers.index');
        // });

    }

    vm.add= function(goIndex) {
        setSelect();
        // vm.customer.customerId = 1;
          Restangular.all('customers').post(vm.customer).then(function(hal) {
              // console.log( customer );
              if (goIndex) {
                  $state.go('customers.index');
              }else {
                  //清空
                  promptService.success(setting.saveSuccess);
                 uiInit();
              }

          }, function(error) {
              promptService.failure(error.data.meta.message);

          });
      };

    function init(){
        if (vm.id>0) {
            Restangular.one("customers",vm.id).get().then(function(hal) {
                // vm._links = hal._links;
                // vm.customer.id = vm.id;
                vm.customer = hal;
                // delete vm.customer._links;

            }, function(error) {
                promptService.failure(setting.getDataError);

            });
            //
            // Restangular.oneUrl("hal",vm.selfLink).get().then(function(hal) {
            //     vm.customer = hal;
            // }, function(error) {
            //     promptService.failure(setting.getDataError);
            //
            // });
        }

    }

      vm.back = back;
      function back() {
          $state.go('customers.index');
      }

    init();

  }

})();
