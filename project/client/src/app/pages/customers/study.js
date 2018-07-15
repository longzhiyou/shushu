/**
 * @author lzy
 * created on 2017-04-17
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customers')
      .controller('customersStudyCtrl', StudyCtrl);

  /** @ngInject */
  function StudyCtrl($stateParams, $state,Restangular,promptService,setting) {

    var vm = this;
    vm.customer=$stateParams.customer;

      // 性别
      vm.genderList = [
          {title: '男', value: '1'},
          {title: '女', value: '2'}
      ];

      //选择后
      vm.selectedGender =vm.genderList[0];

      function getSelectedGender(value) {
          for(var i=0;i<vm.genderList.length;i++){

              if (vm.genderList[i].value===value) {
                  return vm.genderList[i];
              }
          }

      }

      vm.dayun = "甲子";
      vm.liunian="甲子";
      vm.xiaoyun = "甲子";

      vm.bazi = {
          birth:1984,
          "gender":"男",
          "niangan":"丙",
          "nianzhi":"子",

          "yuegan":"丙",
          "yuezhi":"寅",

          "rigan":"甲",
          "rizhi":"寅",

          "shigan":"乙",
          "shizhi":"卯",

          "taigan":"",
          "taizhi":"",

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


      //天干
      var tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

      //地支
      var  dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

      var sixtyJiaZi= [
          "甲子","乙丑","丙寅","丁卯","戊辰","己巳","庚午","辛未","壬申","癸酉",
          "甲戌","乙亥","丙子","丁丑","戊寅","己卯","庚辰","辛巳","壬午","癸未",
          "甲申","乙酉","丙戌","丁亥","戊子","己丑","庚寅","辛卯","壬辰","癸巳",
          "甲午","乙未","丙申","丁酉","戊戌","己亥","庚子","辛丑","壬寅","癸卯",
          "甲辰","乙巳","丙午","丁未","戊申","己酉","庚戌","辛亥","壬子","癸丑",
          "甲寅","乙卯","丙辰","丁巳","戊午","己未","庚申","辛酉","壬戌","癸亥"
      ];

      //60甲子属性
      //http://blog.sina.com.cn/s/blog_614375770102wn3s.html
      var jiazishuxinglist={
          "甲子":['海中金'
              ,'从革之金，其气散，得【戊申土】，【癸巳水】相之，则吉。戊申乃金临官之地，土者更旺于子，必能生成，癸巳系金，生于巳，水旺于子，纳音各有所归，又为朝元禄，忌丁卯丁酉戊午之火'
              ,'进神'
              ,"阎东叟云：甲子金为进神，禀沉潜灵中之德，四时皆吉，入贵格，承旺气，则术业精微，主魁夺之荣。"
              ,"玉霄宝鉴云：甲子乙丑未成器金，见火则成，多见则吉。"
              ,"为宝物,喜金木旺地"
          ],
          "乙丑":["海中金"
              ,"自库之金，火不能克，盖退藏之金，苟无刑害冲破，未有不显荣者，独忌【己丑】【戊午】【己未】之火。"
              ,"正印"
              ,"阎东叟云：具大福德，秋冬富贵寿考，春夏吉中有凶，入格则建功享福，带煞类为凶会，"
              ,"玉霄宝鉴云：甲子乙丑未成器金，见火则成，多见则吉。"
              ,"为顽矿,喜火及南方月时"
          ],
          "丙寅":["炉中火"
              ,"丙寅赫牺之火，无水制之，则为燔灼炎烈之患，水不可遇，独爱甲寅之水，就位济之，又名朝元禄。"
              ,"五行要论云：丙寅火食灵明冲粹之气，四时生生之德，入贵格，则文彩发应，主科甲之贵。"
              ,"珞琭子云：丙寅丁卯秋天宜以保持。莹和尚注云：丙寅丁卯举火之类，秋天保持者，言水生于秋也。鬼谷遗文云：丙寅丁卯秋冬宜以保持。注云：木不南奔火无西旺，火至秋冬，势恐不久。"
              ,""
              ,""
          ],
          "丁卯":["炉中火"
              ,"丁卯伏明之火，气弱宜木生之，遇水则凶，乙卯乙酉水最毒。"
              ,"五行要论云：丁卯沐浴之火，含雷动风作之气，水济之则达，土载之则基厚，以木资之为文彩，以金橐之，更逢夏令则凶暴。"
              ,"珞琭子云：丙寅丁卯秋天宜以保持。莹和尚注云：丙寅丁卯举火之类，秋天保持者，言水生于秋也。鬼谷遗文云：丙寅丁卯秋冬宜以保持。注云：木不南奔火无西旺，火至秋冬，势恐不久。"
              ,""
          ],
          "戊辰":["大林木"
              ,"戊辰两土下木，众金不能克，盖生金，有母子之道，得土生之为佳。"
              ,"五行要论云：戊辰庚寅癸丑三辰，挺木德清健之数，生于春夏，能转立独奋，随变成功，更成旺气，则有凌霄耸壑之志，惟忌秋生，虽怀志节，屈而不伸。"
              ,"珞琭子云：己巳戊辰度乾宫而脱厄。莹和尚注云：己巳戊辰举木之数，西方金鬼旺乡，纳音之木，至此绝矣，斯谓厄会。若度乾亥之宫，木得水以生长，故脱厄。"
              ,""
          ],
          "己巳":["大林木"
              ,"己巳为近火之木，金自此生，于我无伤，忌见生旺之火。"
              ,"阎东叟云：己巳在巽为风动之木，根危易拔，和之以金土，运归东南方成材用虽外阳内阴，别无辅助，则其气灵散，更为生鬼所克，乃不材之本也。"
              ,"珞琭子云：己巳戊辰度乾宫而脱厄。莹和尚注云：己巳戊辰举木之数，西方金鬼旺乡，纳音之木，至此绝矣，斯谓厄会。若度乾亥之宫，木得水以生长，故脱厄。"
          ],"庚午":["路旁土"
              ,"始生之土，木不能克，惟忌水多，反伤其气，木多却有归，盖归未也。"
              ,"阎东叟云：庚午辛未戊申丁巳，皆厚德之土，含容镇静，和气融怡，福禄优裕。入格则多历方岳之任，有普惠博爱之功。"
              ,""
              ,""
          ],"辛未":["路旁土"
              ,"始生之土，木不能克，惟忌水多，反伤其气，木多却有归，盖归未也。"
              ,"阎东叟云：庚午辛未戊申丁巳，皆厚德之土，含容镇静，和气融怡，福禄优裕。入格则多历方岳之任，有普惠博爱之功。"
          ],"壬申":["剑锋金"
              ,"临官之金，利见水土，若丙申丙寅戊午之火，则为灾害。 "
              ,"阎东叟云：壬申金，持天将之威，资临官之气，秋冬掌生杀之权，春夏吉少凶多，入格以功名自奋，带杀之刻剥为能。"
              ,"玉霄宝鉴云：壬申癸酉，金旺之位，不可复旺，旺则伤物；不可见火，见火则自伤。"
              ,""
              ,""
          ],"癸酉":["剑锋金"
              ,"坚成之金，火死于酉，见火何伤，惟忌丁酉火，【就位克之】。 "
              ,"阎东叟云：癸酉自旺之金，禀纯粹之气，春夏为性英明，秋冬尤贵。入格则功业节概，挺转出伦；带杀则少年刚劲，四十之后，渐成纯德。"
              ,"玉霄宝鉴云：壬申癸酉，金旺之位，不可复旺，旺则伤物；不可见火，见火则自伤。"
              ,""
              ,""
          ],


          "甲戌":["山头火"
              ,"自库之火，不嫌众水，惟忌壬戌，所谓墓中受克，其患难逃。"
              ,""
              ,""
              ,""
          ],"乙亥":["山头火"
              ,""
              ,""
              ,""
          ],"丙子":["涧下水"
              ,""
              ,""
              ,""
          ],"丁丑":["涧下水"
              ,""
              ,""
              ,""
          ],"戊寅":["城头土"
              ,""
              ,""
              ,""
          ],"己卯":["城头土"
              ,""
              ,""
              ,""
          ],"庚辰":["白蜡金"
              ,""
              ,""
              ,""
          ],"辛巳":["白蜡金"
              ,""
              ,""
              ,""
          ],"壬午":["杨柳木"
              ,""
              ,""
              ,""
          ],"癸未":["杨柳木"
              ,""
              ,""
              ,""
          ],
          "甲申":["泉中水"],"乙酉":["泉中水"],"丙戌":["屋上土"],"丁亥":["屋上土"],"戊子":["霹雳火"],"己丑":["霹雳火"],"庚寅":["松柏木"],"辛卯":["松柏木"],"壬辰":["长流水"],"癸巳":["长流水"],
          "甲午":["沙中金"],"乙未":["沙中金"],"丙申":["山下火"],"丁酉":["山下火"],"戊戌":["平地木"],"己亥":["平地木"],"庚子":["壁上土"],"辛丑":["壁上土"],"壬寅":["金箔金"],"癸卯":["金箔金"],
          "甲辰":["复灯火"],"乙巳":["复灯火"],"丙午":["天河水"],"丁未":["天河水"],"戊申":["大驿土"],"己酉":["大驿土"],"庚戌":["钗钏金"],"辛亥":["钗钏金"],"壬子":["桑拓木"],"癸丑":["桑拓木"],
          "甲寅":["大溪水"],"乙卯":["大溪水"],"丙辰":["沙中土"],"丁巳":["沙中土"],"戊午":["天上火"],"己未":["天上火"],"庚申":["石榴木"],"辛酉":["石榴木"],"壬戌":["大海水"],"癸亥":["大海水"]
        };

      vm.jiaziinfo="甲子";
      vm.getJiaziShuxing = function() {
          vm.resultJiazi=jiazishuxinglist[vm.jiaziinfo];
      };

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
      

    function init(){
        if (vm.customer) {
            vm.selectedGender = getSelectedGender(vm.customer.gender);

        }

    }

      vm.back = back;
      function back() {
          $state.go('customers.index');
      }

      vm.analyze=function () {

          if (!vm.customer)
          {
              return;

          }



          var strBaZi = vm.customer.bazi;

          var sizhu=[];
          for (var i=0;i<strBaZi.length;i++){
              var s = strBaZi[i];
              var b = false;
              if (tiangan.indexOf(s)>=0) {
                  b=true;
              }else if (dizhi.indexOf(s)>=0) {
                  b=true;
              }

              if (b) {
                  sizhu.push(s);
              }

          }
          if(sizhu.length>7){
              vm.bazi.niangan = sizhu[0];
              vm.bazi.nianzhi = sizhu[1];
              vm.bazi.yuegan = sizhu[2];
              vm.bazi.yuezhi = sizhu[3];
              vm.bazi.rigan = sizhu[4];
              vm.bazi.rizhi = sizhu[5];
              vm.bazi.shigan = sizhu[6];
              vm.bazi.shizhi = sizhu[7];
          }
//        strBaZi = strBaZi.replace(" ", "");//去掉所有空格，包括首尾、中间
//        String[] split = strBaZi.split("");
//           if (sizhu.size()>7) {
//               return new BaZi(sizhu);
//           }else
//               return null;

      };

    init();

  }

})();
