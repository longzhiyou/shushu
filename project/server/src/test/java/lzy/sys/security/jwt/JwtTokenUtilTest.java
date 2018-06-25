package lzy.sys.security.jwt;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * User: longzhiyou
 * Date: 2017/11/16
 * Time: 10:40
 */


public class JwtTokenUtilTest {
    Logger logger = LoggerFactory.getLogger(JwtTokenUtilTest.class);

    @Test
    public void generateToken(){

        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        String tokenByUsername = jwtTokenUtil.generateTokenByUsername("admin");
        logger.info("tokenByUsername:"+tokenByUsername);

    }
}