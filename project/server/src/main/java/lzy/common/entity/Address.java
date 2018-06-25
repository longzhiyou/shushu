package lzy.common.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;

/**
 * 地址模型
 * User: longzhiyou
 * Date: 2017/11/8
 * Time: 13:32
 */
@Where(clause="delete_flag=0")
@NoArgsConstructor
@EqualsAndHashCode(callSuper=true)
@Data
@Entity
public class Address extends BaseIdEntity {

    // 国家
    private String country;
    // 省
    private String province;
    // 市
    private String city;
    // 区县
    private String county;
    // 详细地址
    private String detail;
    //邮编
    private String postCode;

}