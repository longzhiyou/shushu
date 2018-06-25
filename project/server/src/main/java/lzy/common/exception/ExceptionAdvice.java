package lzy.common.exception;

import lzy.common.ResponseMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用于处理所有的异常情况
 * 就像html错误页面能够显示错误信息一样，API 也应该能返回可读的错误信息–它应该和一般的资源格式一致。
 * API应该始终返回相应的状态码，以反映服务器或者请求的状态。API的错误码可以分为两部分，
 * 400系列和500系列，400系列表明客户端错误：如错误的请求格式等。500系列表示服务器错误。
 * API应该至少将所有的400系列的错误以json形式返回。如果可能500系列的错误也应该如此。
 * json格式的错误应该包含以下信息：一个有用的错误信息，一个唯一的错误码，以及任何可能的详细错误描述。如下：
 * @see http://www.csdn.net/article/2013-06-13/2815744-RESTful-API
 *
 * @author lzy
 * @since 1.0.0
 */
@ControllerAdvice
@RestController
public class ExceptionAdvice {

    private static Logger logger = LoggerFactory.getLogger(ExceptionAdvice.class);


    /**
     * 500 - Internal Server Error
     */
//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public ResponseMessage handleException(Exception e) {
//        logger.error("通用异常", e);
//        return new ResponseMessage().failure("exception");
//    }


}
