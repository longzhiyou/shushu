package lzy.module.customer.service;

import lzy.module.bazi.BaZiAlgorithm;
import lzy.module.customer.domain.BaZi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

/**
 * User: longzhiyou
 * Date: 2018/6/25
 * Time: 16:12
 */

@Service
public class BaZiService {

    @Autowired
    private ScriptEngine scriptEngine;

    private BaZiAlgorithm baZiAlgorithm = null;

    public BaZiService(){
        baZiAlgorithm = new BaZiAlgorithm();
    }
    private static final Logger logger = LoggerFactory.getLogger(BaZiService.class);


    public BaZi getBaZi(String strBaZi) {
        strBaZi = strBaZi.replace(" ", "");//去掉所有空格，包括首尾、中间
        String[] split = strBaZi.split("");
        if (split.length>7) {
            return new BaZi(split);
        }else
            return null;
    }
    public Object parseRule(BaZi baZi, String ruleAlgorithm) {

        Object result = null;

        try {
            scriptEngine.eval(ruleAlgorithm);
            Invocable inv = (Invocable) scriptEngine;

            try {
                result = inv.invokeFunction("matchRule"
                        ,baZi , baZiAlgorithm);

            } catch (NoSuchMethodException e) {
                e.printStackTrace();
                logger.error("matchRule:NoSuchMethodException");
            }
        } catch (ScriptException e) {
            e.printStackTrace();
            logger.error("ScriptException:"+e.getMessage());
        }
        return result;

    }
}
