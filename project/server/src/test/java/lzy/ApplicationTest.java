package lzy;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.Assert.*;

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
        String encode = passwordEncoder.encode("123456");

        boolean matches = passwordEncoder.matches("123456", encode);
        logger.info("BCryptPasswordEncoder:"+encode);

    }

}