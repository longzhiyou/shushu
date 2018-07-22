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
        BaZi bazi = new BaZi(Arrays.asList("壬","午", "乙","巳","癸","亥","戊","辰"));
//
//        Object o = baZiRule.liangxiangrun(bazi, algorithm);
//        logger.info("matchRule:"+o);
//
//        o = baZiRule.nianma(bazi, algorithm);
//        logger.info("nianma:"+o);
//
//        o = baZiRule.yangren(bazi, algorithm);
//        logger.info("yangren:"+o);

//        o = baZiRule.shensha(bazi, algorithm);
        o = baZiRule.guanshen(bazi, algorithm);
        logger.info("shensha:"+o);
    }

}