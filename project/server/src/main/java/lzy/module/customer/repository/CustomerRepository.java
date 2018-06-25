package lzy.module.customer.repository;

import lzy.module.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
public interface CustomerRepository extends JpaRepository<Customer, Long> {

//    @Modifying
//    @Query("update Customer t set t.deleteFlag = 1 where t.customerId = ?1")
//    @Override
//    void delete(Long id);


}
