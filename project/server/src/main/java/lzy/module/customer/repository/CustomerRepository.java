package lzy.module.customer.repository;

import lzy.module.customer.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

//@RepositoryRestResource()
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Modifying
    @Query("update Customer t set t.deleteFlag = 1 where t.customerId = ?1")
    @Override
    void delete(Long id);

//    @RestResource(exported = false)
//    @Query("select name,gender from Customer c")
//    List<CustomerGrid> findAllGridBy();

    @Query(value = "select new Customer(c.customerId, c.bazi, c.name, c.gender, c.birth) " +
            "from Customer c order by c.updatedAt Desc")
    List<Customer> grid();

    @Query(value = "select new Customer(c.customerId, c.bazi, c.name, c.gender, c.birth) " +
            "from Customer c ")
    Page gridPage(Pageable p);

//    @Query(value = "select new Customer(c.customerId, c.bazi, c.name, c.gender, c.birth) " +
//            "from Customer c ")
//    List<Customer> findAll();

//    @Query
//    public Page<Customer> findByType(String type, Pageable pageable);

//    @RestResource(path = "nameStartsWith", rel = "nameStartsWithRel")
//    Page findByNameStartsWith(@Param("name") String name, Pageable p);


}
