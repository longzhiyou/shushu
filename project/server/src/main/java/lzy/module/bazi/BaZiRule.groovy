package lzy.module.bazi

import lzy.module.customer.domain.BaZi

/**
 *  滴天髓规则
 * Created by bukeyan on 2017/6/18.
 */
class BaZiRule {

   def matchRule(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
       def mapResult = [:]
       def mapRule = [:]
       def matchStr = ""
       def ruleValue

       def  nianGan = bazi.getNianGan()
       def nianZhi = bazi.getNianZhi()
       def nianZhu = bazi.getNianZhu()

       def yueGan = bazi.getYueGan()
       def yueZhi =bazi.getYueZhi()
       def yueZhu = bazi.getYueZhu()

       def riGan = bazi.getRiGan()
       def riZhi = bazi.getRiZhi()
       def riZhu = bazi.getRiZhu()

       def shiGan = bazi.getShiGan()
       def shiZhi = bazi.getShiZhi()
       def shiZhu = bazi.getShiZhu()



        //填写内容


       def list = riZhi+shiZhi


       //年禄
       def lu = baZiAlgorithm.ganLu.get(nianGan)
       //禄气
       def luqi = ["甲":["丙寅":"福星禄，甲土克丙水为财",
                        "戊寅":"伏马禄，此带刑杖，君子吉小人凶",
                        "庚寅":"破禄，半凶半吉",
                        "壬寅":"正禄，截路空亡，为僧道有福",
                        "甲寅":"长生福星，大吉"],
                   "乙":["丁卯":"截路空亡",
                        "己卯":"进神禄",
                        "辛卯":"破禄，交神",
                        "癸卯":"带天乙死禄，虽贵终贫",
                        "乙卯":"旺禄喜神大吉"],
                   "丙":["己巳":"九天库禄，有官",
                        "辛巳":"截路空亡，多是非",
                        "癸巳":"伏贵神禄，多成败",
                        "乙巳":"旺马禄，有官",
                        "丁巳":"旺库禄，有官"],
                   "丁":["庚午":"截路空亡，多成败",
                        "壬午":"德合禄，有官短命",
                        "甲午":"进神禄，有登科之喜",
                        "丙午":"喜神禄，交阳刃半吉",
                        "戊午":"伏阳刃禄，多凶灾患"],
                   "戊":["己巳":"九天库禄，有官",
                        "辛巳":"截路空亡，有官终失，多是非",
                        "癸巳":"贵神禄，有官位重。戊癸相合吉",
                        "乙巳":"驿马同乡禄，有官大吉",
                        "丁巳":"旺库禄，有官"],
                   "己":["庚午":"截路空亡，为凶象",
                        "壬午":"死鬼禄，凶",
                        "甲午":"进神德合，舒达之象",
                        "丙午":"喜神，羊刃禄,凶",
                        "戊午":"伏阳刃禄，凶"],
                   "庚":["壬申":"大败禄，主贫贱",
                        "甲申":"截路空亡，凶",
                        "丙申":"大败禄，多成败，多是非",
                        "戊申":"伏马禄，多滞",
                        "庚申":"长生禄，大吉"],
                   "辛":["癸酉":"伏神禄",
                        "乙酉":"破禄，多成败",
                        "丁酉":"空亡贵神禄。丁木受气，辛水沐浴主奸淫之事",
                        "己酉":"进神禄，有舒达之兆",
                        "辛酉":"正禄，吉"],
                   "壬":["丁亥":"贵神禄，有官",
                        "乙亥":"天德禄，大吉",
                        "己亥":"旺禄",
                        "辛亥":"同马乡禄，大贵",
                        "癸亥":"大败禄，贫"],
                   "癸":["甲子":"进神禄，登科金达之喜",
                        "丙子":"交，带福星贵，有权",
                        "戊子":"伏，羊刃合贵禄，半吉",
                        "庚子":"应禄吉",
                        "壬子":"正羊刃禄，凶"]
       ]



       //【名位禄】
       def mingweilu = ["甲丙寅","乙丁卯","庚壬申","辛癸酉"]
       def mingweilustr = "【名位禄】皆为贵格 （林开五命）"

       //【生成禄】
       def shengchenglu = ["甲甲寅","乙乙卯","丙丁巳","丁戊午","戊丁巳","己戊午",
                           "庚庚申","辛辛酉","壬癸亥","癸壬子"]
       def shengchenglustr = "【生成禄】"

       //【禄盈天府格】
       def zhenlu=["甲":"丙巳","乙":"己午","丙":"癸子","丁":"丙巳"
                   ,"戊":"丁午","己":"庚申",
                   "庚":"甲寅","辛":"丁午","壬":"辛酉","癸":"甲寅"]
       def zhenlustr = "【禄盈天府格】福禄兼足,稍有福助之，五品之贵，一云重重福禄主富盛"

       def zhenluValue = zhenlu.get(nianGan)
       def listMingGan = [yueGan,riGan,shiGan]
       def listMingZhi = [yueZhi,riZhi,shiZhi]



       //【禄头财】
       def lutoucai =["甲戊寅","乙己卯","丙辛巳","丁庚午"
                ,"戊癸巳","己壬午","庚甲申","辛乙酉","壬丁亥","癸丙子"]
       def lutoucaistr = "【禄头财】主人富有声望。古诗云：禄生于絪缛，因财反有名，君子荣显禄，常人主丰盈。"


       //【禄头鬼】
       def lutougui=["甲庚寅","乙辛卯","丙癸巳","丁壬午"
                ,"戊乙巳","己甲午",
                "庚丙申","辛丁酉","壬己亥","癸戊子"]

       def lutouguistr = "【禄头鬼】又名赤舌杀，君子主甲科，常人口舌刑责，若别有贵救，主家世超越，三代富有，行年太岁遇之，主有灾。（广信录）"



       def luzhilist = [riZhi,shiZhi]
       for(i in 0..1){
           def zhi=luzhilist[i]
           if(lu!=zhi){
               continue
           }


           def zhu=""
           def temp = []

           if(zhi==riZhi){

               zhu = riZhu
               mapResult["日"]=temp

           }else {

               zhu = shiZhu
               mapResult["时"]=temp
           }

           temp.push(luqi.get(nianGan).get(zhu))
           matchStr = nianGan+zhu

           if (mingweilu.contains(matchStr)) {
               temp.push(mingweilustr)

           }

           if (shengchenglu.contains(matchStr)) {
               temp.push(shengchenglustr)

           }


           if (lutoucai.contains(matchStr)) {
               temp.push(lutoucaistr)

           }

           if (lutougui.contains(matchStr)) {
               temp.push(lutouguistr)

           }

           if (zhu[0]==zhenluValue[0]&&listMingZhi.contains(zhenluValue[1])) {
               temp.push(zhenlustr)
           }

       }

       //【暗禄格】五虎遁禄双六合
       mapRule=["甲":"辛亥","乙":"甲戌","丙":"戊申","丁":"辛未"
                ,"戊":"壬申","己":"乙未",
                "庚":"己巳","辛":"壬辰","壬":"丙寅","癸":"己丑"]
       ruleValue= mapRule.get(nianGan)
      def tempShow ="此是上清暗合禄，不因师指若何知。${nianGan}人${ruleValue}"
       if (shiZhu==ruleValue) {
           mapResult["【暗禄格】时柱"]=tempShow.toString()
       }
       if (riZhu==ruleValue) {
           mapResult["【暗禄格】日柱"]=tempShow.toString()
       }





       //年天乙
       def  tianyi= baZiAlgorithm.tianyi.get(nianGan)

       if(tianyi.contains(riZhi)){
           mapResult["年天乙-日支"]=""
       }

       if(tianyi.contains(shiZhi)){
           mapResult["年天乙-时支"]=""
       }
//
//
//       //年五行正印
//       def wuXing = baZiAlgorithm.getNaYinWuXing(nianZhu)
//       def zhengyin = baZiAlgorithm.wuxingzhengyin.get(wuXing)
//       if(zhengyin==riZhu){
//           mapResult["年五行正印-日柱"]=""
//       }
//
//       if(zhengyin==shiZhu){
//           mapResult["年五行正印-时柱"]=""
//       }



       return mapResult

   }
}