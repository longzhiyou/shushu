package lzy.module.bazi

import lzy.module.customer.domain.BaZi

/**
 *  滴天髓规则
 * Created by bukeyan on 2017/6/18.
 */
class BaZiRule {

    def shensha(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
        def mapResult = [:]
        def mapRule = [:]
        def matchStr = ""

        def ruleValue

        def nianGan = bazi.getNianGan()
        def nianZhi = bazi.getNianZhi()
        def nianZhu = bazi.getNianZhu()

        def yueGan = bazi.getYueGan()
        def yueZhi = bazi.getYueZhi()
        def yueZhu = bazi.getYueZhu()

        def riGan = bazi.getRiGan()
        def riZhi = bazi.getRiZhi()
        def riZhu = bazi.getRiZhu()

        def shiGan = bazi.getShiGan()
        def shiZhi = bazi.getShiZhi()
        def shiZhu = bazi.getShiZhu()

        //填写内容
        //截路空亡
        mapRule =[
                "甲":"申酉",
                "乙":"午未",
                "丙":"辰巳",
                "丁":"寅卯",
                "戊":"子丑",
                "己":"申酉",
                "庚":"午未",
                "辛":"辰巳",
                "壬":"寅卯",
                "癸":"子丑"]

        ruleValue = mapRule.get(nianGan)
        matchStr="《八字金书》云：凡值此一重不妨，二三重主早亡，不然主遭刑。如甲己生人，申酉日时，定不好。纵干纳吉，只作寻常命，运到此亦凶。"
        if(ruleValue.contains(shiZhi)){
            mapResult["时支-截路空亡"]=matchStr

        }
        if(ruleValue.contains(riZhi)){
            mapResult["日支-截路空亡"]=matchStr
        }

        //柱
        mapRule = [ "甲申","乙未","丙辰","丁卯","戊子","己酉","庚午","辛巳","壬寅","癸丑"]
        matchStr="精纪重视一柱"
        if(mapRule.contains(shiZhu)){
            mapResult["时柱-截路空亡"]=matchStr

        }
        if(mapRule.contains(riZhu)){
            mapResult["时柱-截路空亡"]=matchStr
        }

        //[吞啖杀]
        mapRule =[
                "子戌":"鼠见犬时须恶死，鼠鸡逐犬遭徙厄",
                "丑丑":"牛到牛宫独自伤",
                "酉戌":"鼠鸡逐犬遭徙厄",
                "卯巳":"免赶蛇踪配远乡",
                "辰辰":"龙上见龙波浪起",
                "巳申":"蛇猴相会树头亡",
                "亥寅":"猪犬羊逢虎必伤",
                "戌寅":"猪犬羊逢虎必伤",
                "未寅":"猪犬羊逢虎必伤"]
        ruleValue = mapRule.get(nianZhi+shiZhi)
        if(ruleValue){
            mapResult["时支-吞啖杀"]=ruleValue

        }
        ruleValue = mapRule.get(nianZhi+riZhi)
        if(ruleValue){
            mapResult["日支-吞啖杀"]=ruleValue
        }


        return mapResult
    }

    def yangren(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
        def mapResult = [:]
        def mapRule = [:]
        def matchStr = ""

        def ruleValue

        def nianGan = bazi.getNianGan()
        def nianZhi = bazi.getNianZhi()
        def nianZhu = bazi.getNianZhu()

        def yueGan = bazi.getYueGan()
        def yueZhi = bazi.getYueZhi()
        def yueZhu = bazi.getYueZhu()

        def riGan = bazi.getRiGan()
        def riZhi = bazi.getRiZhi()
        def riZhu = bazi.getRiZhu()

        def shiGan = bazi.getShiGan()
        def shiZhi = bazi.getShiZhi()
        def shiZhu = bazi.getShiZhu()

        //填写内容
        def list = riZhi+shiZhi

        //真羊刃
        def zhenren =[
                "甲":"丁卯",
                "乙":"庚辰",
                "丙":"甲午",
                "丁":"丁未",
                "戊":"戊午",
                "己":"辛未",
                "庚":"乙酉",
                "辛":"戊戌",
                "壬":"壬子",
                "癸":"癸丑"]

        matchStr = "若人重犯，身有残疾，官禄失退"
        if(zhenren.get(nianGan)==riZhu){
            mapResult["日柱-真羊刃"]=matchStr
        }
        if(zhenren.get(nianGan)==shiZhu){
            mapResult["时柱-真羊刃"]=matchStr
        }

        //自刃
        def ziren=["丙午","丁未","戊午","己未","壬子","癸丑"]
        if(ziren.contains(riZhu)){
            mapResult["日柱-自刃"]="损妻"
        }
        if(ziren.contains(shiZhu)){
            mapResult["时柱-自刃"]="损子"
        }

        //飞刃
        def feiren=["丙子","丁丑","戊子","己丑","壬午","癸未"]
        if(feiren.contains(riZhu)){
            mapResult["日柱-飞刃"]=["损妻","血光之灾"]
        }
        if(feiren.contains(shiZhu)){
            mapResult["时柱-飞刃"]=["损子","血光之灾"]
        }

        //刃头财
        def rencai =[
                "甲":"己卯",
                "乙":"戊辰",
                "丙":"庚午",
                "丁":"辛未",
                "戊":"壬午",
                "己":"癸未",
                "庚":"乙酉",
                "辛":"甲戌",
                "壬":"丙子",
                "癸":"丁丑"]
        matchStr = "又名销镕杀，主财贿歇灭，常人以屠沽刃锯等事为业，或因被盗而致命者有矣。"

        ruleValue = rencai.get(nianGan)
        if(ruleValue==riZhu){
            mapResult["日柱-刃头财"]=matchStr
        }
        if(ruleValue==shiZhu){
            mapResult["时柱-刃头财"]=matchStr
        }

        //刃头鬼
        def rengui =[
                "甲":"辛卯",
                "乙":"庚辰",
                "丙":"壬午",
                "丁":"癸未",
                "戊":"甲午",
                "己":"乙未",
                "庚":"丁酉",
                "辛":"丙戌",
                "壬":"戊子",
                "癸":"己丑"]
        matchStr = "又名名持刀杀，主人不令终，虽入贵格，亦不测，甲乙人见之尤紧，多脑疽发背而终。"
        ruleValue = rengui.get(nianGan)
        if(ruleValue==riZhu){
            mapResult["日柱-刃头鬼"]=matchStr
        }
        if(ruleValue==shiZhu){
            mapResult["时柱-刃头鬼"]=matchStr
        }


        ruleValue = zhenren.get(nianGan)
        matchStr="多主父母恶死，或更带天杀在上，五不失一。"
        if(ruleValue.contains(shiZhi)){
            mapResult["年干临时支作刃"]=matchStr
        }
        if(ruleValue.contains(riZhi)){
            mapResult["年干就日支作刃"]="阴人年干就日支作刃，主夫性恶"
        }

        ruleValue = zhenren.get(riGan)

        if(ruleValue.contains(nianZhi)){
            mapResult["日干-倒悬羊刃"]="日杀归年,主凶"
        }
        if(ruleValue.contains(shiZhi)){
            mapResult["日干就时上作刃"]=["主痕疾，不然即子息带也。","痕瘕 妇女肚子里结块的病。痕瘕 （疤痕。喻曾犯有罪案的人）"]
        }

        ruleValue = zhenren.get(shiGan)
        if(ruleValue.contains(riZhi)){
            mapResult["时干就日支作刃"]=["主妻恶死，并性气，不然是军人，或带痕疾也。"]
        }

        if(ruleValue.contains(nianZhi)){
            mapResult["时干-倒悬羊刃"]=["时杀归年,主凶"]
        }


        return mapResult


    }
    def nianma(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
        def mapResult = [:]
        def mapRule = [:]
        def matchStr = ""

        def ruleValue

        def nianGan = bazi.getNianGan()
        def nianZhi = bazi.getNianZhi()
        def nianZhu = bazi.getNianZhu()

        def yueGan = bazi.getYueGan()
        def yueZhi = bazi.getYueZhi()
        def yueZhu = bazi.getYueZhu()

        def riGan = bazi.getRiGan()
        def riZhi = bazi.getRiZhi()
        def riZhu = bazi.getRiZhu()

        def shiGan = bazi.getShiGan()
        def shiZhi = bazi.getShiZhi()
        def shiZhu = bazi.getShiZhu()

        //填写内容
        def list = riZhi+shiZhi

        for(i in 0..1){
            def zhi=list[i]
            if(baZiAlgorithm.yima.get(nianZhi)!=zhi){
                continue
            }


            def zhu=""
            def temp = []

            if(i==0){

                zhu = riZhu
                mapResult["日"]=temp

            }else {

                zhu = shiZhu
                mapResult["时"]=temp
            }

            temp.push("驿马")
            matchStr = nianGan+zhu


        }

        return mapResult


    }
    def liangxiangrun(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
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

        //1，羊刃格，劫财透月干，四地支中又见二支为正印禄，既羊刃格带印极旺，凶灾.
        //按照此方法只有 木和金日主才有 更严格只有 甲和庚才有
        def showStr =""
        matchStr=riGan+yueZhu
        showStr = "羊刃格，劫财透月干，四地支中又见二支为正印禄，既羊刃格带印极旺，凶灾，无救"
       def ganList = [nianGan,yueGan,shiGan]
        def zhiList = [nianZhi,yueZhi,riZhi,shiZhi]

        def count=0
        if("甲乙卯"==matchStr){

            if(zhiList.count("子")+zhiList.count("亥")>1){
                mapResult["羊刃格带印极旺-凶灾"]=showStr
            }
        }
        else if("庚辛酉"==matchStr ){
            if(zhiList.count("巳")+zhiList.count("午")>1){
                mapResult["羊刃格带印极旺-凶灾"]=showStr
            }
        }
//        else if(renZhi==yueZhi){
//            /**
//             *  核心概念就是 阳刃格局 带比印 太旺
//             * [2017-07-19 add by longzhiyou]
//             */
//            //羊刃格包括阴干,印包括正印偏印∂
//            if((countJiecai+countBiJian)>0&& (countYin+countPianYin)>1){
//                mapResult["羊刃格带印极旺-凶灾-规则放宽"]="羊刃格，劫财透干，又见二支为正印禄，凶灾"
//            }
//
//
//        }
//
//        //2，旺财遇劫带旺印，官非，刑名，意外灾害.
//        def caizhi = commonAlgorithm.getShiShenDiZhi(riGan, "正财")
//        def piancaizhi = commonAlgorithm.getShiShenDiZhi(riGan, "偏财")
//        if((caizhi==yueZhi||piancaizhi==yueZhi) && jiecai==yueGan && (countYin+countPianYin)>1){
//
//            mapResult["旺财遇劫带旺印-官非，刑名，意外灾害"]="月支正财禄，月干劫财，地支有两个印临官位"
//        }
//
//        //3，双禄带比印，孤克之命.
//        if(luZhi==riZhi && bazi.getDiZhiCount(luZhi)>1 && (countYin+countPianYin)>0){
//            if(countJiecai>0){
//                mapResult["双禄带劫财印，大凶之命"]="日主坐禄，又重见禄支，天干透劫财，更有[印]专旺之支"
//            }else if(countBiJian>0 ){
//                mapResult["双禄带比印，孤克之命"]="日主坐禄，又重见禄支，天干透比，更有[印]专旺之支"
//            }
//
//        }
//
//        //4，日主坐禄透比，更有印专旺之支，过旺.官非，残疾
//        if(luZhi==riZhi && countBiJian>0 && (countYin+countPianYin)>0){
//            mapResult["日主坐禄透比，更有印专旺之支"]="过旺.官非，残疾。如果三会印，则大凶"
//®
//        }

        return mapResult
    }

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






//       //年禄
//       def lu = baZiAlgorithm.ganLu.get(nianGan)
//       //禄气
//       def luqi = ["甲":["丙寅":"福星禄，甲土克丙水为财",
//                        "戊寅":"伏马禄，此带刑杖，君子吉小人凶",
//                        "庚寅":"破禄，半凶半吉",
//                        "壬寅":"正禄，截路空亡，为僧道有福",
//                        "甲寅":"长生福星，大吉"],
//                   "乙":["丁卯":"截路空亡",
//                        "己卯":"进神禄",
//                        "辛卯":"破禄，交神",
//                        "癸卯":"带天乙死禄，虽贵终贫",
//                        "乙卯":"旺禄喜神大吉"],
//                   "丙":["己巳":"九天库禄，有官",
//                        "辛巳":"截路空亡，多是非",
//                        "癸巳":"伏贵神禄，多成败",
//                        "乙巳":"旺马禄，有官",
//                        "丁巳":"旺库禄，有官"],
//                   "丁":["庚午":"截路空亡，多成败",
//                        "壬午":"德合禄，有官短命",
//                        "甲午":"进神禄，有登科之喜",
//                        "丙午":"喜神禄，交阳刃半吉",
//                        "戊午":"伏阳刃禄，多凶灾患"],
//                   "戊":["己巳":"九天库禄，有官",
//                        "辛巳":"截路空亡，有官终失，多是非",
//                        "癸巳":"贵神禄，有官位重。戊癸相合吉",
//                        "乙巳":"驿马同乡禄，有官大吉",
//                        "丁巳":"旺库禄，有官"],
//                   "己":["庚午":"截路空亡，为凶象",
//                        "壬午":"死鬼禄，凶",
//                        "甲午":"进神德合，舒达之象",
//                        "丙午":"喜神，羊刃禄,凶",
//                        "戊午":"伏阳刃禄，凶"],
//                   "庚":["壬申":"大败禄，主贫贱",
//                        "甲申":"截路空亡，凶",
//                        "丙申":"大败禄，多成败，多是非",
//                        "戊申":"伏马禄，多滞",
//                        "庚申":"长生禄，大吉"],
//                   "辛":["癸酉":"伏神禄",
//                        "乙酉":"破禄，多成败",
//                        "丁酉":"空亡贵神禄。丁木受气，辛水沐浴主奸淫之事",
//                        "己酉":"进神禄，有舒达之兆",
//                        "辛酉":"正禄，吉"],
//                   "壬":["丁亥":"贵神禄，有官",
//                        "乙亥":"天德禄，大吉",
//                        "己亥":"旺禄",
//                        "辛亥":"同马乡禄，大贵",
//                        "癸亥":"大败禄，贫"],
//                   "癸":["甲子":"进神禄，登科金达之喜",
//                        "丙子":"交，带福星贵，有权",
//                        "戊子":"伏，羊刃合贵禄，半吉",
//                        "庚子":"应禄吉",
//                        "壬子":"正羊刃禄，凶"]
//       ]
//
//
//
//       //【名位禄】
//       def mingweilu = ["甲丙寅","乙丁卯","庚壬申","辛癸酉"]
//       def mingweilustr = "【名位禄】皆为贵格 （林开五命）"
//
//       //【生成禄】
//       def shengchenglu = ["甲甲寅","乙乙卯","丙丁巳","丁戊午","戊丁巳","己戊午",
//                           "庚庚申","辛辛酉","壬癸亥","癸壬子"]
//       def shengchenglustr = "【生成禄】"
//
//       //【禄盈天府格】
//       def zhenlu=["甲":"丙巳","乙":"己午","丙":"癸子","丁":"丙巳"
//                   ,"戊":"丁午","己":"庚申",
//                   "庚":"甲寅","辛":"丁午","壬":"辛酉","癸":"甲寅"]
//       def zhenlustr = "【禄盈天府格】福禄兼足,稍有福助之，五品之贵，一云重重福禄主富盛"
//
//       def zhenluValue = zhenlu.get(nianGan)
//       def listMingGan = [yueGan,riGan,shiGan]
//       def listMingZhi = [yueZhi,riZhi,shiZhi]
//
//
//
//       //【禄头财】
//       def lutoucai =["甲戊寅","乙己卯","丙辛巳","丁庚午"
//                ,"戊癸巳","己壬午","庚甲申","辛乙酉","壬丁亥","癸丙子"]
//       def lutoucaistr = "【禄头财】主人富有声望。古诗云：禄生于絪缛，因财反有名，君子荣显禄，常人主丰盈。"
//
//
//       //【禄头鬼】
//       def lutougui=["甲庚寅","乙辛卯","丙癸巳","丁壬午"
//                ,"戊乙巳","己甲午",
//                "庚丙申","辛丁酉","壬己亥","癸戊子"]
//
//       def lutouguistr = "【禄头鬼】又名赤舌杀，君子主甲科，常人口舌刑责，若别有贵救，主家世超越，三代富有，行年太岁遇之，主有灾。（广信录）"
//
//
//
//       def luzhilist = [riZhi,shiZhi]
//       for(i in 0..1){
//           def zhi=luzhilist[i]
//           if(lu!=zhi){
//               continue
//           }
//
//
//           def zhu=""
//           def temp = []
//
//           if(zhi==riZhi){
//
//               zhu = riZhu
//               mapResult["日"]=temp
//
//           }else {
//
//               zhu = shiZhu
//               mapResult["时"]=temp
//           }
//
//           temp.push(luqi.get(nianGan).get(zhu))
//           matchStr = nianGan+zhu
//
//           if (mingweilu.contains(matchStr)) {
//               temp.push(mingweilustr)
//
//           }
//
//           if (shengchenglu.contains(matchStr)) {
//               temp.push(shengchenglustr)
//
//           }
//
//
//           if (lutoucai.contains(matchStr)) {
//               temp.push(lutoucaistr)
//
//           }
//
//           if (lutougui.contains(matchStr)) {
//               temp.push(lutouguistr)
//
//           }
//
//           if (zhu[0]==zhenluValue[0]&&listMingZhi.contains(zhenluValue[1])) {
//               temp.push(zhenlustr)
//           }
//
//       }

//       //【暗禄格】五虎遁禄双六合
//       mapRule=["甲":"辛亥","乙":"甲戌","丙":"戊申","丁":"辛未"
//                ,"戊":"壬申","己":"乙未",
//                "庚":"己巳","辛":"壬辰","壬":"丙寅","癸":"己丑"]
//       ruleValue= mapRule.get(nianGan)
//      def tempShow ="此是上清暗合禄，不因师指若何知。${nianGan}人${ruleValue}"
//       if (shiZhu==ruleValue) {
//           mapResult["【暗禄格】时柱"]=tempShow.toString()
//       }
//       if (riZhu==ruleValue) {
//           mapResult["【暗禄格】日柱"]=tempShow.toString()
//       }





//       //年天乙
//       def  tianyi= baZiAlgorithm.tianyi.get(nianGan)
//
//       if(tianyi.contains(riZhi)){
//           mapResult["年天乙-日支"]=""
//       }
//
//       if(tianyi.contains(shiZhi)){
//           mapResult["年天乙-时支"]=""
//       }
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