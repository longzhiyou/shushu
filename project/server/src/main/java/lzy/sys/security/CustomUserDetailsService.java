package lzy.sys.security;


import lzy.sys.auth.entity.User;
import lzy.sys.auth.domain.UserInfo;
import lzy.sys.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

/**
 * User: longzhiyou
 * Date: 2017/3/17
 * Time: 12:26
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {


    @Autowired
    private AuthService authService;



    @Override
//    @ExceptionHandler({UnauthorizedException.class})
    public UserDetails loadUserByUsername(String username) {

        User userEntity = authService.findUser(username);
        if (null==userEntity) {
            return null;
//            throw new UnauthorizedException(String.format("没有发现用户 '%s'.", username));
        }

        UserInfo user = new UserInfo();
        user.setUsername(username);
        user.setPassword(userEntity.getPassword());
        user.setEnabled(userEntity.getEnabled());

//        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
//        authorities.add(new SimpleGrantedAuthority("bestskip"));
//
//        user.setAuthorities(authorities);
        return user;

    }
}
