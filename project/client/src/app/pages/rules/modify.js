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
    // vm.id=$stateParams.id>0?$stateParams.id:0;
    vm.id=$stateParams.id;


      // 性别
      vm.typeList = [
          {title: '全部', value: 0},
          {title: '分析', value: 1},
          {title: '过滤', value: 2}
      ];
      //选择后
      vm.typeSelected =vm.typeList[0];
      function getSelected(value) {
          var list = vm.typeList;
          for(var i=0;i<list.length;i++){

              if (list[i].value===value) {
                  return list[i];
              }
          }

      }

      function setSelect() {
          vm.rule.type = vm.typeSelected.value;
      }


      vm.rule={};


      function uiInit() {
          vm.rule={

          };

      }

      vm.save=save;
    function save() {
        setSelect();
        Restangular.one("hal/rules",vm.id).customPUT(vm.rule).then(function(response) {
            promptService.success(setting.saveSuccess);
        }, function(error) {
            promptService.failure(setting.saveError);

        });


    }

    vm.add= function(goIndex) {

        setSelect();
          Restangular.all('hal/rules').post(vm.rule).then(function(hal) {
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
        if (vm.id) {
            Restangular.one("hal/rules",vm.id).get().then(function(hal) {
                vm.rule = hal;
                vm.typeSelected = getSelected(hal.type);
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
