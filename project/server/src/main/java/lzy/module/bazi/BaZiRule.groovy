package lzy.module.bazi

import lzy.module.customer.domain.BaZi
import sun.tools.tree.IfStatement

/**
 *  滴天髓规则
 * Created by bukeyan on 2017/6/18.
 */
class BaZiRule {

   def matchRule(BaZi  bazi, BaZiAlgorithm baZiAlgorithm) {
       def mapResult = [:]
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



       def lu = baZiAlgorithm.ganLu.get(nianGan)
       if(lu==riZhi){
           mapResult["年禄"]="日支"
       }

       if(lu==shiZhi){
           mapResult["年禄"]="时支"
       }

       def  tianyi= baZiAlgorithm.tianyi.get(nianGan)

       if(tianyi.contains(riZhi)){
           mapResult["年tianyi"]="日支"
       }

       if(tianyi.contains(shiZhi)){
           mapResult["年tianyi"]="时支"
       }

       return mapResult

   }
}