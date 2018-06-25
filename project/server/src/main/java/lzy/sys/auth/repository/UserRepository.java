package lzy.sys.auth.repository;

import lzy.sys.auth.entity.User;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * User: longzhiyou
 * Date: 2016/11/8
 * Time: 20:04
 */
//@CacheConfig(cacheNames = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Integer> {

    //将缓存保存进andCache，并使用参数中的bid加上一个字符串(这里使用方法名称)作为缓存的key
//    @Cacheable(value="findFirstByUsername")
    User findFirstByUsername(String username);

}
