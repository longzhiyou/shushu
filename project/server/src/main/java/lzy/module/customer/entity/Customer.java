package lzy.module.customer.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lzy.module.person.entity.PersonEntity;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * User: longzhiyou
 * Date: 2017/11/8
 * Time: 13:32
 */
@Where(clause="delete_flag=0")
@NoArgsConstructor
@EqualsAndHashCode(callSuper=true)
@Data
@Entity
public class Customer extends PersonEntity {

    @Id
    @GenericGenerator(name = "idGenerator", strategy = "lzy.common.entity.IdGenerator")
    @GeneratedValue(generator = "idGenerator")
    private Long customerId;
    private String bazi;

    private String label;



    @Column(length=4096)
    private String description;

    public Customer(Long customerId,String bazi,
                    String name,String gender,String birth) {
        this.customerId = customerId;
        this.bazi = bazi;
        this.setName(name);
        this.setGender(gender);
        this.setBirth(birth);
    }
}