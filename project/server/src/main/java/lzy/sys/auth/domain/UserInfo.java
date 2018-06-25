package lzy.sys.auth.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

/**
 * 登陆成功后返回的用户信息
 * User: longzhiyou
 * Date: 2016/11/4
 * Time: 16:08
 */


@Data
@NoArgsConstructor
public class UserInfo implements UserDetails {

    private Integer id;

    @NonNull
    private String username;
    private String token;

    //返回分配给用户的角色列表
    private Collection<? extends GrantedAuthority> authorities;

    private Date lastPasswordResetDate;

    @JsonIgnore
    private String password;

    // 账户是否禁用
    @JsonIgnore
    private boolean enabled;





    // 账户是否未过期
    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    // 账户是否未锁定
    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 密码是否未过期
    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    // 这个是自定义的，返回上次密码重置日期
    @JsonIgnore
    public Date getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }
}