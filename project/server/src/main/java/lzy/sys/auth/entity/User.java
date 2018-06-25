package lzy.sys.auth.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import lzy.common.entity.BaseEntity;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;

/**
 * User: longzhiyou
 * Date: 2016/11/18
 * Time: 16:18
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=true)
@Entity
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;


    @NotEmpty(message="姓名不能为空")
    private String username;

    @Length(min=6,message="密码长度不能小于6位")
    private String password;

    private Boolean enabled;

}
