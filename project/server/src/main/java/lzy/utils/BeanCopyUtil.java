package lzy.utils;

import com.xiaoleilu.hutool.util.BeanUtil;

/**
 * User: longzhiyou
 * Date: 2017/10/25
 * Time: 17:39
 */
public interface BeanCopyUtil {


    /**
     * 默认不拷贝null
     * @param source
     * @param target
     */
     static void copyPropertiesIgnoreNull(Object source, Object target) {

         BeanUtil.copyProperties(source, target, BeanUtil.CopyOptions.create().setIgnoreNullValue(true));
    }

    /**
     * 只拷贝父类
     * @param source
     * @param target
     * @param editable 父类
     */
    static void copyParentProperties(Object source, Object target, Class<?> editable) {

        BeanUtil.copyProperties(source, target, BeanUtil.CopyOptions.create().setEditable(editable));
    }


}
