package lzy;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * User: longzhiyou
 * Date: 2017/11/16
 * Time: 10:40
 */
public class ApplicationTest {

    private Logger logger = LoggerFactory.getLogger(ApplicationTest.class);
    private int PASSWORD_ENCODER_STRENGTH=4;

    @Test
    public void generatePassword(){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(PASSWORD_ENCODER_STRENGTH);
        String encode = passwordEncoder.encode("12345678");

        boolean matches = passwordEncoder.matches("123456", encode);
        logger.info("BCryptPasswordEncoder:"+encode);

    }
    @Test
    public void demo(){
        String strBaZi = "甲 乙 丙 丁";
        strBaZi = strBaZi.replace(" ", "");//去掉所有空格，包括首尾、中间
        String[] split = strBaZi.split("");

        logger.info("八字:"+split.length);
    }



}