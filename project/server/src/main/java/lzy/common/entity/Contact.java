package lzy.common.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;

/**
 * 联系方式
 * User: longzhiyou
 * Date: 2017/11/8
 * Time: 13:32
 */
@Where(clause="delete_flag=0")
@NoArgsConstructor
@EqualsAndHashCode(callSuper=true)
@Data
@Entity
public class Contact extends BaseIdEntity {

    // 联系类型
    // 手机 mail
    private Integer type;

    // 详细
    private String detail;

}