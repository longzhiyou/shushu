package lzy.sys.auth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private String password;

    private Boolean enabled;

//    private final Username username;
//    private final Password password;

//    User() {
//        this.username = null;
//        this.password = null;
//    }
//
//    /**
//     * Makes sure only {@link User}s with encrypted {@link Password} can be persisted.
//     */
//    @PrePersist
//    @PreUpdate
//    void assertEncrypted() {
//
//        if (!password.isEncrypted()) {
//            throw new IllegalStateException("Tried to persist/load a user with a non-encrypted password!");
//        }
//    }


}
