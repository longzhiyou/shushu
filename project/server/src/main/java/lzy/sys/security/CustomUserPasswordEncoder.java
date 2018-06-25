package lzy.sys.security;


import com.xiaoleilu.hutool.crypto.SecureUtil;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * User: longzhiyou
 * Date: 2017/3/17
 * Time: 13:38
 */
public class CustomUserPasswordEncoder implements PasswordEncoder {
    @Override
    public String encode(CharSequence charSequence) {
        return null;
    }

    @Override
    public boolean matches(CharSequence charSequence, String s) {
        boolean equals = SecureUtil.sha1(charSequence.toString()).equals(s);
        return equals;
    }
}
