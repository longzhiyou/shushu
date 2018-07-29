package lzy.module.bazi

import lzy.module.customer.domain.BaZi

/**
 *
 * Created by bukeyan on 2017/6/18.
 */
class BaZiRule {

    //精纪天乙贵人
    def jingjitianyi(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
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

    //精纪贵格
    def jingjiguige(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
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


        mapRule=["甲子":"甲寅","乙丑":"乙卯","丙寅":"丙辰","丁卯":"丁巳"
                 ,"戊辰":"戊午","己巳":"己未",
                 "庚午":"庚申","辛未":"辛酉","壬申":"壬戌","癸酉":"癸亥"]

        ruleValue= mapRule.get(nianZhu)

        matchStr ="命前二辰见本禄有用，必贵。无用既平常也 《鬼谷命决》"
        if (shiZhu==ruleValue) {
            mapResult["【金章格】时柱"]=matchStr
        }
        if (riZhu==ruleValue) {
            mapResult["【金章格】日柱"]=matchStr
        }




        mapRule=["甲申":"己巳","乙酉":"庚辰","丙戌":"辛卯","丁亥":"壬寅"
                 ,"戊寅":"癸亥","己卯":"甲戌",
                 "庚辰":"乙酉","辛巳":"丙申","壬午":"丁未","癸未":"戊午"]

        ruleValue= mapRule.get(nianZhu)

        matchStr ="此是荣华福寿龄，中若更加他格局，定生王侯宰相身。"
        if (shiZhu==ruleValue) {
            mapResult["【荣华格】时柱"]=matchStr
        }
        if (riZhu==ruleValue) {
            mapResult["【荣华格】日柱"]=matchStr
        }

        mapRule=["戊辰":"甲寅","甲寅":"戊辰"]

        ruleValue= mapRule.get(nianZhu)

        matchStr ="寅辰两字见龙吟，遇此生人福最深，虎啸风生人相厚，荣华富贵积【资】金。"
        if (shiZhu==ruleValue) {
            mapResult["【龙吟虎啸格】时柱"]=matchStr
        }
        if (riZhu==ruleValue) {
            mapResult["【龙吟虎啸格】日柱"]=matchStr
        }



        return mapResult
    }

    //精纪禄
    def jingjilu(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
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

            if(i==0){

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



        mapRule=["甲":["辛酉","辛亥"],
                      "己":["辛丑","辛未"],

                      "乙":["壬子" ,"壬申" ],
                      "庚":["乙丑","乙未","己丑","己未"],

                      "丙":[ "癸巳","癸卯"],
                      "辛":["丁酉","丁亥"],

                      "丁":[ "辛酉","辛亥"],
                      "壬":[ "丙寅","丙午" ],

                      "戊":["癸酉","癸亥"],
                      "癸":["乙丑","乙未","己丑","己未"]
        ]

        ruleValue= mapRule.get(nianGan)

        matchStr =["如更入格，贵极一品，常格得之，不下三品"
                    ,"太岁本干不见禄，取五虎元遁，至禄上看得何干，真干见天乙贵神，而贵人所坐之干，复得贵于禄上者是也。"]
        if (ruleValue.contains(shiZhu)) {
            mapResult["【天禄贵神】时柱"]=matchStr
        }
        if (ruleValue.contains(riZhu)) {
            mapResult["【天禄贵神】日柱"]=matchStr
        }

        //相合禄
        mapRule=["甲":"己亥","乙":"庚戌","丙":"辛巳","丁":"壬午"
                 ,"戊":"癸巳","己":"甲午",
                 "庚":"乙巳","辛":"丙辰","壬":"丁亥","癸":"戊子"]

        ruleValue= mapRule.get(nianGan)

        matchStr ="禄若会见则富贵，相合则奋迅，遇食神则福紧，值天牛力慢，切忌冲破。"
        if (shiZhu==ruleValue) {
            mapResult["【禄位会合】时柱"]=matchStr
        }
        if (riZhu==ruleValue) {
            mapResult["【禄位会合】日柱"]=matchStr
        }

        mapRule=["甲子":"甲寅","乙丑":"乙卯","丙寅":"丙辰","丁卯":"丁巳"
                 ,"戊辰":"戊午","己巳":"己未",
                 "庚午":"庚申","辛未":"辛酉","壬申":"壬戌","癸酉":"癸亥"]

        ruleValue= mapRule.get(nianGan)

        matchStr ="命前二辰见本禄有用，必贵。无用既平常也 《鬼谷命决》"
        if (shiZhu==ruleValue) {
            mapResult["【金章格】时柱"]=matchStr
        }
        if (riZhu==ruleValue) {
            mapResult["【金章格】日柱"]=matchStr
        }

        mapRule=["甲子":"甲寅","乙丑":"乙卯","丙寅":"丙辰","丁卯":"丁巳"
                 ,"戊辰":"戊午","己巳":"己未",
                 "庚午":"庚申","辛未":"辛酉","壬申":"壬戌","癸酉":"癸亥"]

        ruleValue= mapRule.get(nianGan)

        matchStr ="命前二辰见本禄有用，必贵。无用既平常也 《鬼谷命决》"
        if (shiZhu==ruleValue) {
            mapResult["【荣华格】时柱"]=matchStr
        }
        if (riZhu==ruleValue) {
            mapResult["【荣华格】日柱"]=matchStr
        }


        return mapResult
    }

    //精纪马
    def jingjiama(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
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

    //论官神
    def guanshen(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
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

        //正官禄，五虎遁官禄位
        mapRule = [
                "甲辛未",
                "甲丁丑",
                "戊乙丑",
                "戊己未",
                "庚癸未",
                "庚己丑",

                "乙戊子",
                "乙甲申",
                "己丙子",
                "己壬申",

                "丙己亥",
                "丙丁酉",
                "丁辛亥",
                "丁己酉",

                "壬癸卯",
                "壬乙巳",
                "癸乙卯",
                "癸丁巳",

                "辛庚寅",
                "辛甲午",


        ]
        matchStr="若不犯空亡驳杂者清贵，安逸之人也。"
        if(mapRule.contains(nianGan+shiZhu)){
            mapResult["时柱-贵人入庙格"]=matchStr

        }
        if(mapRule.contains(nianGan+riZhu)){
            mapResult["日柱-贵人入庙格"]=matchStr
        }

        mapRule = [
                "甲乙丑",
                "甲癸未",
                "戊乙丑",
                "戊癸未",
                "庚乙丑",
                "庚癸未",

                "乙庚子",
                "乙戊申",
                "己丙子",
                "己甲申",

                "丙乙亥",
                "丙丁酉",
                "丁乙亥",
                "丁丁酉",

                "壬乙卯",
                "壬癸巳",
                "癸乙卯",
                "癸癸巳",

                "辛丙寅",
                "辛戊午",


        ]

        matchStr="更有一种贵人，亦为福甚，重得者必贵"
        if(mapRule.contains(nianGan+shiZhu)){
            mapResult["时柱-特殊贵人"]=matchStr

        }
        if(mapRule.contains(nianGan+riZhu)){
            mapResult["日柱-特殊贵人"]=matchStr
        }

        mapRule = [
                "壬寅甲寅",
                "丙申戊申",
        ]

        matchStr=["若入贵格，别无刑冲，乃清贵之命也，又主一生少病，早年享福常格得之，一生无刑狱宫府之灾"
                  ,"假令壬寅人得甲寅日时，壬贵在卯，甲贵在丑是也"]
        if (mapRule.contains(nianZhu+shiZhu)) {
            mapResult["时柱-天乙扶身格"]=matchStr
        }

        if (mapRule.contains(nianZhu+riZhu)) {
            mapResult["日柱-天乙扶身格"]=matchStr
        }



        //正官禄，五虎遁官禄位
         mapRule = [
            "甲癸酉",
            "己丙寅",
            "乙甲申",
            "庚壬午",
            "丙庚子",
            "辛癸巳",
            "丁辛亥",
            "壬丙午",
            "戊乙卯",
            "癸丁巳"

        ]

        matchStr="五虎遁官禄位，犯者胜带正官，正禄见带前后神亦佳。（太一经）"
        if(mapRule.contains(nianGan+shiZhu)){
            mapResult["时柱-正官禄"]=matchStr

        }
        if(mapRule.contains(nianGan+riZhu)){
            mapResult["日柱-正官禄"]=matchStr
        }

        mapRule = [
                "甲寅己亥",
                "庚寅乙亥",

        ]
        if(mapRule.contains(nianZhu+shiZhu)){
            mapResult["【三台拱帝座格】"]=["如不犯凶神恶杀冲破，则官入三台，如有则灭落断之。（玉霄宝鉴）","假令纳音本干见真官，而二位天地相合，中见夹两干贵人是。"]
        }




        mapRule=[
                "甲":"辛丑",
                "乙":"辛丑",
                "丙":"壬辰",
                "丁":"壬辰",
                "戊":"乙未",
                "己":"乙未",

                "庚":"丙戌",
                "辛":"丙戌",

                "壬":"戊辰",
                "癸":"戊辰"
        ]

        ruleValue = mapRule.get(nianGan)
        matchStr=["如辛金克甲乙木，金墓在丑，余仿此，君子主甲科，武人战功，常人艺业出俗。"]

        if(ruleValue.equals(shiZhu)){
            mapResult["时柱-官会杀"]=matchStr
        }
        if(ruleValue.equals(riZhu)){
            mapResult["日柱-官会杀"]=matchStr
        }


       mapRule=[
                "申":"丙戌",
                "子":"丙戌",
                "辰":"丙戌",

                "亥":"戊辰",
                "卯":"戊辰",
                "未":"戊辰",

                "寅":"辛丑",
                "午":"辛丑",
                "戌":"辛丑",

                "巳":"乙未",
                "酉":"乙未",
                "丑":"乙未"
        ]

        ruleValue = mapRule.get(nianZhi)
        matchStr=["名利并行，寅午戌火克金，金墓在丑","妻财聚会之神，主富足，及有美妻、横财，却防妇人毒药害命，古诗去：财会刑，商贾因妻富出伦，但防毒药因此掩夜轮。（并广信集）"]

        if(ruleValue.equals(shiZhu)){
            mapResult["时柱-财会杀"]=matchStr
        }
        if(ruleValue.equals(riZhu)){
            mapResult["日柱-财会杀"]=matchStr
        }


       ruleValue= baZiAlgorithm.getNaYinWuXing(nianZhu)
        mapRule = ["金":"己丑",
                              "木":"乙未" ,
                              "水":"丙辰",
                              "火":"壬戌",
                              "土":"戊辰"]
        matchStr="五行墓中逢鬼,如此之格，危疑者甚。（珞琭子）"
        if(mapRule.get(ruleValue).equals(shiZhu)){
            mapResult["时柱-墓在鬼中"]=matchStr
        }
        if(mapRule.get(ruleValue).equals(riZhu)){
            mapResult["日柱-墓在鬼中"]=matchStr
        }

        def riyue =[riZhu,shiZhu]
        mapRule = ["甲申":"乙酉",
                   "乙酉":"甲申" ,
                   "丙午":"壬子",
                   "壬子":"丙午",
                   "乙卯":"戊申",
                   "戊申":"乙卯",
                   "庚午":"壬午",
                   "壬午":"庚午",
                   "丁巳":["辛亥","癸亥"],
                   "辛亥":"丁巳",
                   "癸亥":"丁巳",


        ]
       ruleValue  = mapRule.get(nianZhu)
        if(nianZhu=="丁巳"){
            if(riyue.contains("辛亥")){
                mapResult["【交互官格-大贵辛亥】"]=nianZhu+"见辛亥"
            }
            if(riyue.contains("癸亥")){
                mapResult["【交互官格-大贵癸亥】"]=nianZhu+"见癸亥"
            }
        }else {
            if(riyue.contains(ruleValue)){
                mapResult["【交互官格-大贵】"]=nianZhu+"见"+ruleValue
            }
        }





        mapResult

    }

    //神煞
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

        def yunGan = bazi.getYunGan()
        def yunZhi = bazi.getYunZhi()
        def yunZhu = bazi.getYunZhu()

        def matchDiZhi = [shiZhi,riZhi,yunZhi]

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

        /**
         * 甲己年：三月，戊戌。七月，癸亥。十月，丙申。十一月，丁亥
         * 乙庚年：四月，壬申。九月，乙巳。
         * 丙辛年：三月，辛巳。九月，庚辰。十月，甲辰。
         * 丁壬年：无
         * 戊癸年：六月，己丑。
         *
         * 十恶大败日 出道藏第四十九
         * [2017-10-10 add by longzhiyou]
         */

        def shiedabai = [
                "甲辰戊戌","甲申癸亥","甲亥丙申","甲子丁亥",
                "己辰戊戌","己申癸亥","己亥丙申","己子丁亥",

                "乙巳壬申","乙戌乙巳",
                "庚巳壬申","庚戌乙巳",

                "丙辰辛巳","丙戌庚辰","丙亥甲辰",
                "辛辰辛巳","辛戌庚辰","辛亥甲辰",
                "戊未己丑",
                "癸未己丑"
        ]

        if (shiedabai.contains(nianGan+yueZhi+riZhu)){
            mapResult["【十恶大败日】"]=nianGan+"年"+yueZhi+"月"+riZhu+"日"
        }
        def jianfengsha=["寅甲甲","卯乙乙","辰戊戊"
                         ,"巳丙丙","午丁丁","未己己"
                         ,"申庚庚","酉辛辛","戌戊戊"
                         ,"亥壬壬","子癸癸","丑己己"]
        if (jianfengsha.contains(yueZhi+riGan+shiGan)) {
            mapResult["【戟锋煞-月支日干时干】"]=["命主后天意外伤害而伤残，大运流年忌讳【忌干】旺支。刑合之期"
                                       ,"正月起甲，二月在乙，三月在戊，四月在丙，五月在丁，六月在己， 七月在庚，八月在辛，九月在戌，十月在壬，十一月在癸，十二月在巳，逐月处于旺盛的天干加临，日柱、时柱带两重的，凶，此煞再与悬针相见，命主被判流 刑，伤残。"
            ]
        }
        def posha=["卯午","丑辰","子酉","未戌"]
        if (posha.contains(nianZhi+shiZhi)) {
            mapResult["【破煞-年时地支】"]="少年多灾难，多指连累家属破财，如连年有病，增加家长无限忧虑。"
        }
        def tianxingsha=["子乙","丑乙","寅庚","卯辛"
                         ,"辰辛","巳壬","午癸","未癸"
                         ,"申丙","酉丁","戌丁","亥戊"]
        if (tianxingsha.contains(nianZhi+shiGan)) {
            mapResult["【天刑煞-年支时干组合】"]="体弱多病，一生多有疾病。常与医生交往，医药费比较高，但也年年过"
        }

        def leitingsha = [ "寅":"子",
                           "申":"子",
                           "卯":"寅",
                           "酉":"寅",

                           "辰":"辰",
                           "戌":"辰",

                           "巳":"午",
                           "亥":"子",

                           "午":"申",
                           "子":"申",
                           "未":"戍",
                           "丑":"戍"
        ]

        matchStr = leitingsha.get(yueZhi)
        if (matchStr==shiZhi) {
            mapResult["【雷霆煞-月支对时支】"]="忽然遇难,祸起萧墙。如游泳淹死，登山失足坠山，驾驶昏睡出车祸。"
        }

        mapRule=["子":"亥","丑":"子","寅":"丑","卯":"寅",
                    "辰":"卯","巳":"辰","午":"巳","未":"午",
                    "申":"未","酉":"申","戌":"酉","亥":"戌"]

        ruleValue= mapRule.get(nianZhi)

        matchStr ="命中及行运见之，主灾病。"
        if (shiZhi==ruleValue) {
            mapResult["【病符煞】时支"]=matchStr
        }
        if (riZhu==ruleValue) {
            mapResult["【病符煞】日支"]=matchStr
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