/**
 * @author lzy
 * created on 2017-04-17
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rules')
      .controller('rulesModifyCtrl', ModifyCtrl);

  /** @ngInject */
  function ModifyCtrl($stateParams, $state,Restangular,promptService,setting) {

    var vm = this;
    vm.id=$stateParams.id>0?$stateParams.id:0;

    // 性别
    vm.genderList = [
        {title: '男', value: '1'},
        {title: '女', value: '2'}
    ];

      //选择后的厂家
      vm.selectedGender =vm.genderList[0];

      function getSelectedGender(value) {
          for(var i=0;i<vm.genderList.length;i++){

              if (vm.genderList[i].value===value) {
                  return vm.selectedGender[i];
              }
          }

      }
      vm.customer={};


      function uiInit() {


      }

      function setSelect() {
          vm.customer.gender = vm.selectedGender.value;
      }


      vm.save=save;
    function save() {
        setSelect();

        Restangular.one("rules",vm.id).customPUT(vm.customer).then(function(hal) {
            $state.go('rules.index');
        });


    }

    vm.add= function(goIndex) {
        setSelect();
        // vm.customer.customerId = 1;
          Restangular.all('rules').post(vm.customer).then(function(hal) {
              // console.log( customer );
              if (goIndex) {
                  $state.go('rules.index');
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
            Restangular.one("rules",vm.id).get().then(function(hal) {
                vm.customer = hal;
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
