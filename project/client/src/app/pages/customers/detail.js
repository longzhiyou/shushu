/**
 * @author lzy
 * created on 2017-04-17
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customers')
      .controller('customersDetailCtrl', DetailCtrl);

  /** @ngInject */
  function DetailCtrl($stateParams, $state,Restangular,promptService,setting) {

    var vm = this;
    vm.id=$stateParams.id>0?$stateParams.id:0;

      vm.bazi = {
          "gender":"女",
          "niangan":"丙",
          "nianzhi":"子",
          "yuegan":"丙",
          "yuezhi":"寅",
          "rigan":"甲",
          "rizhi":"寅",
          "shigan":"乙",
          "shizhi":"卯",

          "taigan":"甲",
          "taizhi":"子",
          "minggan":"甲",
          "mingzhi":"子",
          "shengan":"甲",
          "shenzhi":"子",

          "yungan":"乙",
          "yunzhi":"丑",
          "liuniangan":"丙",
          "liunianzhi":"寅",
          "xingniangan":"丁",
          "xingnianzhi":"亥"
      };
      vm.year = 1984;
      vm.xingnian=[[],[],[],[],[],[],[],[],[],[]];
      vm.xingnianShiZhu=[[],[],[],[],[],[],[],[],[],[]];

      var yangGan = ["甲","丙","戊","庚","壬"];
      function isYangGan(gan) {
          var index = yangGan.indexOf(gan);
          return index > 0;
      }

      vm.calculateXingNian=calculateXingNian;
      vm.calculateXingNianShiZhu=calculateXingNianShiZhu;



      var sixtyJiaZi= [
          "甲子","乙丑","丙寅","丁卯","戊辰","己巳","庚午","辛未","壬申","癸酉",
          "甲戌","乙亥","丙子","丁丑","戊寅","己卯","庚辰","辛巳","壬午","癸未",
          "甲申","乙酉","丙戌","丁亥","戊子","己丑","庚寅","辛卯","壬辰","癸巳",
          "甲午","乙未","丙申","丁酉","戊戌","己亥","庚子","辛丑","壬寅","癸卯",
          "甲辰","乙巳","丙午","丁未","戊申","己酉","庚戌","辛亥","壬子","癸丑",
          "甲寅","乙卯","丙辰","丁巳","戊午","己未","庚申","辛酉","壬戌","癸亥"
      ];

      function getJiaZiIndex(jiazi) {
          for(var i=0;i<60;i++){
              if (sixtyJiaZi[i]===jiazi) {
                  return i;
              }
          }
          return 0 ;
      }

      //计算行年
      function calculateXingNian() {
          //传统算法 男-丙寅顺行 女-壬申逆行
          //丙寅索引 2 壬申索引 8

          if (vm.bazi.gender==="男") {

              for(var i=0;i<100;i++){

                  vm.xingnian[parseInt(i/10)][i%10]= sixtyJiaZi[(i+2)%60];
              }
          }
          else {
              for(var j=0;j<100;j++){

                  var index = (8-j)%60;
                  if (index<0) {
                      index = 60+index;
                  }

                  vm.xingnian[parseInt(j/10)][j%10]= sixtyJiaZi[index];

              }
          }

      }
      function calculateXingNianShiZhu() {
          //获取时柱
          var startIndex = sixtyJiaZi.indexOf(vm.bazi.shigan+vm.bazi.shizhi);

          //时柱 阳男阴女-顺行 阴男阳女-逆行
          if ((vm.bazi.gender==="男" && isYangGan(vm.bazi.niangan)) || (vm.bazi.gender==="女"&& !isYangGan(vm.bazi.niangan)) ) {
              for(var i=0;i<100;i++){

                  vm.xingnianShiZhu[parseInt(i/10)][i%10]= sixtyJiaZi[(i+startIndex+1)%60];
              }

          }else {
              for(var j=0;j<100;j++){

                  var index = (startIndex-j-1)%60;
                  if (index<0) {
                      index = 60+index;
                  }

                  vm.xingnianShiZhu[parseInt(j/10)][j%10]= sixtyJiaZi[index];

              }
      
          }


      }
      
    // 性别
    vm.genderList = [
        {title: '男', value: '1'},
        {title: '女', value: '2'}
    ];

    function init(){
        if (vm.id>0) {
            Restangular.one("customers",vm.id).get().then(function(hal) {
                vm.customer = hal;
                // vm.selectedGender = getSelectedGender(hal.gender);

            }, function(error) {
                promptService.failure(setting.getDataError);

            });

        }

    }

      vm.back = back;
      function back() {
          $state.go('customers.index');
      }

    init();

  }

})();
