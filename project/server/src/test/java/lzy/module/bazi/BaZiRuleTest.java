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
        BaZi bazi = new BaZi("戊辰癸未甲寅辛亥");
//
//        Object o = baZiRule.liangxiangrun(bazi, algorithm);
//        logger.info("matchRule:"+o);
//
//        o = baZiRule.jingjiama(bazi, algorithm);
//        logger.info("jingjiama:"+o);
//
//        o = baZiRule.yangren(bazi, algorithm);®
//        logger.info("yangren:"+o);

//        o = baZiRule.jingjilu(bazi, algorithm);
//        o = baZiRule.guanshen(bazi, algorithm);
        o = baZiRule.jingjiguige(bazi, algorithm);
        logger.info("结果:"+o);
    }

}