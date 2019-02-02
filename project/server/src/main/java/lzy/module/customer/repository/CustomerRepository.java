package lzy.module.customer.repository;

import lzy.module.customer.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

//@RepositoryRestResource()
public interface CustomerRepository extends JpaRepository<Customer, Long>

{

//    @CacheEvict(value="Customers")
    @Modifying
    @Query("update Customer t set t.deleteFlag = 1 where t.customerId = ?1")
    @Override
    void delete(Long id);

//    @RestResource(exported = false)
//    @Query("select name,gender from Customer c")
//    List<CustomerGrid> findAllGridBy();

//    @Cacheable(value="Customers")

    @RestResource(path = "filter", rel = "filterRel")
    @Query(value = "select c from Customer c where c.description like concat('%',:match,'%') or c.label like concat('%',:match,'%') or c.bazi like concat('%',:match,'%') or c.name like concat('%',:match,'%') order by c.updatedAt Desc ")
    Page filter(@Param("match") String match, Pageable p);


}
