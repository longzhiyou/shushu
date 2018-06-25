package lzy.sys.security;

import org.springframework.security.web.authentication.WebAuthenticationDetails;

import javax.servlet.http.HttpServletRequest;

/**
 * Spring Security在登录验证中增加额外数据（如验证码）
 * http://www.cnblogs.com/phoenix-smile/p/5666686.html
 * User: longzhiyou
 * Date: 2017/3/20
 * Time: 13:38
 */
public class CustomWebAuthenticationDetails extends WebAuthenticationDetails {

    private static final long serialVersionUID = 6975601077710753878L;
    private final String token;
    public CustomWebAuthenticationDetails(HttpServletRequest request) {
        super(request);
        token = request.getParameter("token");
    }
    public String getToken() {
        return token;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(super.toString()).append("; Token: ").append(this.getToken());
        return sb.toString();
    }
}
