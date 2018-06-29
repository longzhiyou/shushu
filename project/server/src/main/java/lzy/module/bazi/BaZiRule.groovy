package lzy.module.bazi

import lzy.module.customer.domain.BaZi

/**
 *  滴天髓规则
 * Created by bukeyan on 2017/6/18.
 */
class BaZiRule {

   def matchRule(BaZi  bazi, BaZiAlgorithm algorithm) {
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

       mapResult["年禄测试"]="年禄"

       if (mapResult.size()>0) {
           mapResult
       }

   }
}