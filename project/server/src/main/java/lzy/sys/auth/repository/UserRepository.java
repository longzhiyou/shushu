package lzy.sys.auth.repository;

import lzy.sys.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * User: longzhiyou
 * Date: 2016/11/8
 * Time: 20:04
 */
//@CacheConfig(cacheNames = "users")
//@RepositoryRestResource(exported = false)
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public interface UserRepository extends JpaRepository<User, Long> {

    @Modifying
    @Query("update User t set t.deleteFlag = 1 where t.userId = ?1")
    @Override
    void delete(Long id);

    @Override
    @RestResource(exported = false)
    void delete(User entity);

    //将缓存保存进andCache，并使用参数中的bid加上一个字符串(这里使用方法名称)作为缓存的key
//    @Cacheable(value="findFirstByUsername")
//    @RestResource(exported = false)
    User findFirstByUsername(String username);

}
