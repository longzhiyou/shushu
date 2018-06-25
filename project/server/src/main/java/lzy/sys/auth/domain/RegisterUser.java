package lzy.sys.auth.domain;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * Created by bukeyan on 2017/4/4.
 */
@Data
public class RegisterUser {

    @NotEmpty(message="姓名不能为空")
    private String username;

    @NotEmpty(message="密码不能为空")
    @Length(min=6,message="密码长度不能小于6位")
    private String password;

//    private String serial;
    @NotEmpty(message="序列号不能为空")
    private String license;
}
