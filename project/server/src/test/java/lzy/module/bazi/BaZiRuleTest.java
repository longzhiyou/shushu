package lzy.module.bazi;

import lzy.ApplicationTest;
import lzy.module.customer.domain.BaZi;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;

/**
 * User: longzhiyou
 * Date: 2018/6/25
 * Time: 20:57
 */
public class BaZiRuleTest {
    private Logger logger = LoggerFactory.getLogger(ApplicationTest.class);
    @Test
    public void matchRule() throws Exception {

        BaZiRule baZiRule = new BaZiRule();
        BaZiAlgorithm algorithm = new BaZiAlgorithm();

        Object o;
        BaZi bazi = new BaZi(Arrays.asList("甲","子", "乙","巳","辛","卯","庚","寅"));
//
//        Object o = baZiRule.liangxiangrun(bazi, algorithm);
//        logger.info("matchRule:"+o);
//
//        o = baZiRule.nianma(bazi, algorithm);
//        logger.info("nianma:"+o);
//
//        o = baZiRule.yangren(bazi, algorithm);
//        logger.info("yangren:"+o);

        o = baZiRule.shensha(bazi, algorithm);
        logger.info("shensha:"+o);
    }

}