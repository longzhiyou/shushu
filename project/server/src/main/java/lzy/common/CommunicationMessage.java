package lzy.common;

import lombok.Data;

/**
 * 此为通信消息
 * User: longzhiyou
 * Date: 2017/10/12
 * Time: 10:07
 */
@Data
public class CommunicationMessage {
    //命令:指示消息做什么
    String command;

    //消息实际内容
    Object body;


}
