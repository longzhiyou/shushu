package lzy.module.customer.service;

import lzy.module.bazi.BaZiAlgorithm;
import lzy.module.customer.domain.BaZi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;
import java.util.ArrayList;
import java.util.List;

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
        if (StringUtils.isEmpty(strBaZi)) {
            return null;
        }

        List<String> tianGanList = (List<String>) baZiAlgorithm.getInfoTianGan();
        List<String> diZhiList = (List<String>) baZiAlgorithm.getInfoDiZhi();
        List<String> sizhu =  new ArrayList<>();

        for (int i=0;i<strBaZi.length();i++){
            String s = strBaZi.substring(i,i+1);
            boolean b = false;
            if (tianGanList.contains(s)) {
                b=true;
            }else if (diZhiList.contains(s)) {
                b=true;
            }

            if (b) {
                sizhu.add(s);
            }

        }
//        strBaZi = strBaZi.replace(" ", "");//去掉所有空格，包括首尾、中间
//        String[] split = strBaZi.split("");
        if (sizhu.size()>7) {
            return new BaZi(sizhu);
        }else
            return null;
    }
    public Object parseRule(BaZi baZi, String ruleAlgorithm) {

        if (baZi==null)
            return null;

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
                result = null;
            }
        } catch (ScriptException e) {
            e.printStackTrace();
            logger.error("ScriptException:"+e.getMessage());
            result = null;
        }
        return result;

    }
}
