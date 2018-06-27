package lzy.module.bazi

/**
 *
 * User: longzhiyou 
 * Date: 2018/6/25 
 * Time: 15:09 
 */
class BaZiAlgorithm {

    //天干禄地支
    static mapTianGanLu =[
            "甲":"寅",
            "乙":"卯",
            "丙":"巳",
            "丁":"午",
            "戊":"巳",
            "己":"午",
            "庚":"申",
            "辛":"酉",
            "壬":"亥",
            "癸":"子"]

    //天干旺
    static infoWangZhu = ["甲寅","乙卯","丙午","丁巳","戊午","丁巳","庚申","辛酉","壬子","癸亥"]


    //长生诀
    static  infoChangShengJue = ["长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养"]
    //长生诀不同的名称
    static mapChangShengJueName =
            [
                    "生":"长生",
                    "败":"沐浴",
                    "禄":"临官",
                    "旺":"帝旺",
                    "刃":"帝旺",
                    "阳刃":"帝旺",
                    "羊刃":"帝旺",
                    "库":"墓"
            ]
}
