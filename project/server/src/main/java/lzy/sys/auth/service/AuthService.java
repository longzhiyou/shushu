package lzy.sys.auth.service;

import lzy.common.exception.UnauthorizedException;
import lzy.sys.auth.domain.RegisterUser;
import lzy.sys.auth.entity.User;
import lzy.sys.auth.domain.UserInfo;
import lzy.sys.auth.repository.UserRepository;
import lzy.utils.LicenseGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 系统认证服务
 * User: longzhiyou
 * Date: 2016/11/21
 * Time: 10:18
 */
@Service
@Transactional()
public class AuthService {


    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    @Autowired
    private UserRepository userRepository;

//    User register(User userToAdd);
//    String login(String username, String password);
//    String refresh(String oldToken);


    //将缓存保存进andCache，并使用参数中的bid加上一个字符串(这里使用方法名称)作为缓存的key
    @Cacheable(value="andCache",key="#username+'findUser'")
    public User findUser(String username){

        User user = userRepository.findFirstByUsername(username);
        return user;
    }

    //清除掉全部缓存
//    @CacheEvict(value="andCache",allEntries=true,beforeInvocation=true)
    //清除掉指定key中的缓存
    @CacheEvict(value="andCache",key="#user.username + 'findUser'")
    public UserInfo addUser(RegisterUser user){

//        log.info("清除指定缓存"+user.getUsername()+"findFirstByUsername");

        //验证序列号
//        if (!LicenseGenerator.matches(user.getLicense())){
//            throw new UnauthorizedException("序列号不正确");
//        }

        User entity = findUser(user.getUsername());
      if (null!=entity) {
          throw new UnauthorizedException("用户名已存在");
        }


      User userEntity = new User();
      userEntity.setEnabled(true);
      userEntity.setUsername(user.getUsername());
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
      User save = userRepository.save(userEntity);

      UserInfo info = new UserInfo();
      BeanUtils.copyProperties(save,info);
//      info.setEnabled(save.getEnabled());
//      info.setUsername(save.getUsername());
//      info.setId(save.getId());
      return info;


    }



}
