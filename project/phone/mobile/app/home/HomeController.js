/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('homeController', HomeController);
    /* @ngInject */
    function HomeController(setting,auth,permissions,$rootScope,$state,toastr){
        var vm = this;


        // 性别
        vm.genderList = [{
            title: '男',
            value: '1'
        },
            {
                title: '女',
                value: '2'
            }
        ];

        //阴阳
        var yinyang = ["阴", "阳"];

        //天干
        var tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

        //地支
        var dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

        //五行
        var wuxing = ["木", "火", "土", "金", "水"];

        var sixtyJiaZi = [
            "甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉",
            "甲戌", "乙亥", "丙子", "丁丑", "戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未",
            "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳",
            "甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯",
            "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑",
            "甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥"
        ];


        //五虎遁
        var wuhudun = {
            "甲": ["丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉", "甲戌", "乙亥", "丙子", "丁丑"],
            "己": ["丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉", "甲戌", "乙亥", "丙子", "丁丑"],

            "乙": ["戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未", "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑"],
            "庚": ["戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未", "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑"],

            "丙": ["庚寅", "辛卯", "壬辰", "癸巳", "甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑"],
            "辛": ["庚寅", "辛卯", "壬辰", "癸巳", "甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑"],

            "丁": ["壬寅", "癸卯", "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑"],
            "壬": ["壬寅", "癸卯", "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑"],

            "戊": ["甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥", "甲子", "乙丑"],
            "癸": ["甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥", "甲子", "乙丑"]
        };

        //60甲子纳音
        var jiazinayin = {
            "甲子": '海中金',
            "乙丑": "海中金",
            "丙寅": "炉中火",
            "丁卯": "炉中火",
            "戊辰": "大林木",
            "己巳": "大林木",
            "庚午": "路旁土",
            "辛未": "路旁土",
            "壬申": "剑锋金",
            "癸酉": "剑锋金",
            "甲戌": "山头火",
            "乙亥": "山头火",
            "丙子": "涧下水",
            "丁丑": "涧下水",
            "戊寅": "城头土",
            "己卯": "城头土",
            "庚辰": "白蜡金",
            "辛巳": "白蜡金",
            "壬午": "杨柳木",
            "癸未": "杨柳木",
            "甲申": "泉中水",
            "乙酉": "泉中水",
            "丙戌": "屋上土",
            "丁亥": "屋上土",
            "戊子": "霹雳火",
            "己丑": "霹雳火",
            "庚寅": "松柏木",
            "辛卯": "松柏木",
            "壬辰": "长流水",
            "癸巳": "长流水",
            "甲午": "沙中金",
            "乙未": "沙中金",
            "丙申": "山下火",
            "丁酉": "山下火",
            "戊戌": "平地木",
            "己亥": "平地木",
            "庚子": "壁上土",
            "辛丑": "壁上土",
            "壬寅": "金箔金",
            "癸卯": "金箔金",
            "甲辰": "复灯火",
            "乙巳": "复灯火",
            "丙午": "天河水",
            "丁未": "天河水",
            "戊申": "大驿土",
            "己酉": "大驿土",
            "庚戌": "钗钏金",
            "辛亥": "钗钏金",
            "壬子": "桑拓木",
            "癸丑": "桑拓木",
            "甲寅": "大溪水",
            "乙卯": "大溪水",
            "丙辰": "沙中土",
            "丁巳": "沙中土",
            "戊午": "天上火",
            "己未": "天上火",
            "庚申": "石榴木",
            "辛酉": "石榴木",
            "壬戌": "大海水",
            "癸亥": "大海水"
        };

        //六甲旬
        var liujiaxun = {
            "甲子": '甲子',
            "乙丑": "甲子",
            "丙寅": "甲子",
            "丁卯": "甲子",
            "戊辰": "甲子",
            "己巳": "甲子",
            "庚午": "甲子",
            "辛未": "甲子",
            "壬申": "甲子",
            "癸酉": "甲子",

            "甲戌": "甲戌",
            "乙亥": "甲戌",
            "丙子": "甲戌",
            "丁丑": "甲戌",
            "戊寅": "甲戌",
            "己卯": "甲戌",
            "庚辰": "甲戌",
            "辛巳": "甲戌",
            "壬午": "甲戌",
            "癸未": "甲戌",

            "甲申": "甲申",
            "乙酉": "甲申",
            "丙戌": "甲申",
            "丁亥": "甲申",
            "戊子": "甲申",
            "己丑": "甲申",
            "庚寅": "甲申",
            "辛卯": "甲申",
            "壬辰": "甲申",
            "癸巳": "甲申",

            "甲午": "甲午",
            "乙未": "甲午",
            "丙申": "甲午",
            "丁酉": "甲午",
            "戊戌": "甲午",
            "己亥": "甲午",
            "庚子": "甲午",
            "辛丑": "甲午",
            "壬寅": "甲午",
            "癸卯": "甲午",

            "甲辰": "甲辰",
            "乙巳": "甲辰",
            "丙午": "甲辰",
            "丁未": "甲辰",
            "戊申": "甲辰",
            "己酉": "甲辰",
            "庚戌": "甲辰",
            "辛亥": "甲辰",
            "壬子": "甲辰",
            "癸丑": "甲辰",

            "甲寅": "甲寅",
            "乙卯": "甲寅",
            "丙辰": "甲寅",
            "丁巳": "甲寅",
            "戊午": "甲寅",
            "己未": "甲寅",
            "庚申": "甲寅",
            "辛酉": "甲寅",
            "壬戌": "甲寅",
            "癸亥": "甲寅"
        };

        /**
         * 1、驾前神煞
         一 太岁剑锋伏尸寄（建）
         二 太阳天空仍可畏（除）
         三 丧门内外孝服至（满）
         四 太阴贯索勾绞具（平）
         五 官符杖责难回避（定）
         六 死符月德同行位（执）
         七 岁破月空拦杆是（破）
         八 龙德暴败天厄至（危）
         九 白虎飞廉同此处（成）
         十 天德福星卷舌系（收）
         十一 吊客天狗吠（开）
         十二 病符顺行位（闭）

         十二流星是1.太岁2.青龙3.丧门4.六合.5.官符.6.小耗.7.岁破(大耗).8.朱雀.9.白虎.10.贵神.11.吊客.12.病符

         *【太岁十二杀】
         太岁、生气、丧门、天医、官符、死符、大耗、发盗、福德、大吉、吊客、病符（洞微经）
         灵台经云：太岁丧门须哭泣，吊客死病亦灾殃，官符牢狱发盗贼，天医福德且安康，生气大吉元来喜，大耗资财有损伤。

         *
         */
        var jiaqian = [
            "一 太岁、太岁剑锋伏尸寄（建）太岁",
            "二 生气、太阳天空仍可畏（除）青龙",
            "三 丧门、丧门内外孝服至（满）丧门",
            "四 天医、太阴贯索勾绞具（平）六合",
            "五 官符、官符杖责难回避（定）官符",
            "六 死符、死符月德同行位（执）小耗",
            "七 大耗、岁破月空拦杆是（破）岁破",
            "八 发盗、龙德暴败天厄至（危）朱雀",
            "九 福德、白虎飞廉同此处（成）白虎",
            "十 大吉、天德福星卷舌系（收）贵神",
            "十一 吊客、吊客天狗吠（开）吊客",
            "十二 病符、病符顺行位（闭）病符"];
        function jiaqianshensha(zhi){

            var match = {};
            var index = dizhi.indexOf(zhi);
            for(var i=0;i<12;i++){
                // match[jiaqian[i]]=dizhi[(i+index)%12];
                match[i+1+dizhi[(i+index)%12]]=jiaqian[i];
            }

            return match;

        }



        vm.strBaZi = "甲子 丙寅 庚辰 己丑";
        vm.analyze = analyze;

        function pasebazi(strBaZi) {
            var sizhu = [];
            for (var i = 0; i < strBaZi.length; i++) {
                var s = strBaZi[i];
                var b = false;
                if (tiangan.indexOf(s) >= 0) {
                    b = true;
                } else if (dizhi.indexOf(s) >= 0) {
                    b = true;
                }

                if (b) {
                    sizhu.push(s);
                }

            }
            if (sizhu.length > 7) {
                vm.niangan = sizhu[0];
                vm.nianzhi = sizhu[1];
                vm.nianzhu = vm.niangan + vm.nianzhi;
                vm.niannayin = jiazinayin[vm.nianzhu];

                vm.yuegan = sizhu[2];
                vm.yuezhi = sizhu[3];
                vm.yuezhu = vm.yuegan + vm.yuezhi;
                vm.yuenayin = jiazinayin[vm.yuezhu];

                vm.rigan = sizhu[4];
                vm.rizhi = sizhu[5];
                vm.rizhu = vm.rigan + vm.rizhi;
                vm.rinayin = jiazinayin[vm.rizhu];

                vm.shigan = sizhu[6];
                vm.shizhi = sizhu[7];
                vm.shizhu = vm.shigan + vm.shizhi;
                vm.shinayin = jiazinayin[vm.shizhu];
            }
        }

        //天干禄地支
        var ganlu = {
            "甲": "寅",
            "乙": "卯",
            "丙": "巳",
            "丁": "午",
            "戊": "巳",
            "己": "午",
            "庚": "申",
            "辛": "酉",
            "壬": "亥",
            "癸": "子"
        };

        function getlu(gan) {
            return ganlu[gan];
        }


        vm.gufa = {}

        function analyze() {
            pasebazi(vm.strBaZi);

            vm.gufa = {
                "五虎遁": wuhudun[vm.niangan],
                "太岁十二杀":jiaqianshensha(vm.nianzhi),
                "四贵位":["四贵","四平","四忌"],
                "贵人":["正天乙"],
                "禄":{
                    "正禄":getlu(vm.niangan),
                    "本家禄":"",
                    "名位禄":"",
                    "生成禄":"",
                    "五虎遁禄":"",
                    "天禄贵神":"",
                    "禄盈天府格":"",
                },
                "马":[""],
                "官":[""],

            }

        }


        analyze();
    }

})(this.angular);