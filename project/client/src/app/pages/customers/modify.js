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



    // 性别
    vm.genderList = [
        {title: '男', value: '1'},
        {title: '女', value: '2'}
    ];

      //选择后
      vm.selectedGender =vm.genderList[0];
      vm.customer={};
      function getSelectedGender(value) {
          for(var i=0;i<vm.genderList.length;i++){

              if (vm.genderList[i].value===value) {
                  return vm.genderList[i];
              }
          }

      }



      function uiInit() {
          vm.customer={
              name:"无名",
              bazi:""
          };

      }

      function setSelect() {
          vm.customer.gender = vm.selectedGender.value;
      }


      vm.save=save;
    function save() {
        setSelect();

        Restangular.one("customers",vm.id).customPUT(vm.customer).then(function(response) {
            promptService.success(setting.saveSuccess);
        }, function(error) {
            promptService.failure(setting.saveError);

        });


    }

    vm.add= function(goIndex) {
        setSelect();
        // vm.customer.customerId = 1;
          Restangular.all('customers').post(vm.customer).then(function(response) {
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
        uiInit();
        if (vm.id>0) {
            Restangular.one("customers",vm.id).get().then(function(hal) {
                vm.customer = hal;
                vm.selectedGender = getSelectedGender(hal.gender);

            }, function(error) {
                promptService.failure(setting.getDataError);

            });

        }

    }


      vm.back = back;
      function back() {
          $state.go('customers.index');
      }

      vm.analyze = function () {
          setSelect();
          var filter  = {
              gender:vm.customer.gender,
              bazi:vm.customer.bazi
          };
          Restangular.one("bazis","analyze").get(filter).then(function(result) {
              vm.result = result;

          }, function(error) {
              promptService.failure(setting.getDataError);

          });

      };

    init();

  }

})();
