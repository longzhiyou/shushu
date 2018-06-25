package lzy.module.customer.bazi;

import lzy.module.customer.domain.BaZi;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * User: longzhiyou
 * Date: 2018/6/25
 * Time: 20:57
 */
public class BaZiRuleTest {
    @Test
    public void matchRule() throws Exception {

        BaZiRule baZiRule = new BaZiRule();
        BaZiAlgorithm algorithm = new BaZiAlgorithm();
        BaZi bazi = new BaZi(" 甲子 丙子 丙戌 庚寅");

        Object o = baZiRule.matchRule(bazi, algorithm);
    }

}