package lzy.module.customer.repository;

import lzy.module.customer.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource()
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Modifying
    @Query("update Customer t set t.deleteFlag = 1 where t.customerId = ?1")
    @Override
    void delete(Long id);

    @RestResource(path = "nameStartsWith", rel = "nameStartsWithRel")
    Page findByNameStartsWith(@Param("name") String name, Pageable p);


}
