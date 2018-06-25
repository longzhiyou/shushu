package lzy.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * User: longzhiyou
 * Date: 2016/11/21
 * Time: 10:20
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(){
        super();
    }

    public UnauthorizedException(String message) {
        super(message);
    }

}
