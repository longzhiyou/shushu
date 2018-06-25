package lzy.common;

/**
 * rest服务返回json格式的响应对象.
 *
 * @since 1.0.0
 */
public class ResponseMessage {

    private static final String OK = "ok";
    private static final String ERROR = "error";

    private Meta meta;
    private Object data;

    public final ResponseMessage success() {
        this.meta = new Meta(true, OK);
        return this;
    }

    public final ResponseMessage success(Object data) {
        this.meta = new Meta(true, OK);
        this.data = data;
        return this;
    }

    public final ResponseMessage failure() {
        this.meta = new Meta(false, ERROR);
        return this;
    }

    public final ResponseMessage failure(String message) {
        this.meta = new Meta(false, message);
        return this;
    }

    public final Meta getMeta() {
        return meta;
    }

    public final Object getData() {
        return data;
    }

    private static final class Meta {

        private boolean success;
        private String message;

        public Meta(boolean success) {
            this.success = success;
        }

        public Meta(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public boolean isSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }
    }
}
