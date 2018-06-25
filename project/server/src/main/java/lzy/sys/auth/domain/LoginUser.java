package lzy.sys.auth.domain;

import lombok.Data;

/**
 * 前台提交的用户信息
 * User: longzhiyou
 * Date: 2016/11/4
 * Time: 16:08
 */


@Data
public class LoginUser {

    private String username;
    private String password;

}