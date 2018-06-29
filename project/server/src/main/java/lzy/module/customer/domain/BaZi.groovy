package lzy.module.customer.domain
/**
 * User: longzhiyou
 * Date: 2016/11/28
 * Time: 10:10
 */

class BaZi {

    //性别
      String gender
    /**
     * 四柱天干地支
     * [2017-06-09 add by longzhiyou]
     */
      String nianGan
      String nianZhi
      String nianZhu

      String yueGan
      String yueZhi
      String yueZhu

      String riGan
      String riZhi
      String riZhu

      String shiGan
      String shiZhi
      String shiZhu

    //大运干支
      String yunGan=""
      String yunZhi=""
      String yunZhu=""

    //流年干支
      String liunianGan=""
      String liunianZhi=""
      String liunianZhu=""

    //行年干支
      String xingnianan=""
      String xingnianZhi=""
      String xingnianZhu=""

    //胎命干支
      String taiGan=""
      String taiZhi=""
      String taiZhu=""

    //年月日时天干
    List<String> listMingGan
    List<String> listMingZhi
    List<String> listMingZhu


    //批大运

    //批流年
    List<String> listMingYunSuiGan
    /**
     * 命运岁相关
     * [2017-06-13 add by longzhiyou]
     */
    List<String> listMingYunSuiZhi

    List<String> listMingYunSuiZhu

    /**
     * 八字字符串,如果是10个则对应最后面是胎柱
     * [2018-06-25 add by longzhiyou]
     */
     BaZi(String strBaZi){

        strBaZi = strBaZi.replace(" ", "")//去掉所有空格，包括首尾、中间
        String[] split = strBaZi.split("")


         this.nianGan = split[0]
         this.nianZhi = split[1]
         this.yueGan = split[2]
         this.yueZhi =split[3]
         this.riGan = split[4]
         this.riZhi = split[5]
         this.shiGan = split[6]
         this.shiZhi = split[7]

         this.nianZhu = nianGan+nianZhi
         this.yueZhu = yueGan+yueZhi
         this.riZhu = riGan+riZhi
         this.shiZhu = shiGan+shiZhi

         this.listMingGan = [nianGan, yueGan,riGan,shiGan]
         this.listMingZhi = [nianZhi, yueZhi,riZhi,shiZhi]
         this.listMingZhu = [nianZhu, yueZhu,riZhu,shiZhu]

         if (split.length>8){
           this.taiGan = split[8]
             this.taiZhi = split[9]
             this.taiZhu =  taiGan+taiZhi
         }
    }


}
