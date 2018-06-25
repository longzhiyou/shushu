package lzy.sys.mybatis;

import com.github.pagehelper.PageHelper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

/**
 * https://github.com/pagehelper/Mybatis-PageHelper
 * 详情参考:http://blog.csdn.net/zhugeyangyang1994/article/details/52038398
 * 只有紧跟在 PageHelper.startPage 方法后的第一个 MyBatis 的查询(select)方法会被分页。
 * User: longzhiyou
 * Date: 2017/5/5
 * Time: 16:22
 */
@Configuration
public class MybatisConf {
    @Bean
    public PageHelper pageHelper() {
        System.out.println("MyBatisConfiguration.pageHelper()");
        PageHelper pageHelper = new PageHelper();
        Properties p = new Properties();
        p.setProperty("offsetAsPageNum", "true");
        p.setProperty("rowBoundsWithCount", "true");
        p.setProperty("reasonable", "true");

//        支持通过Mapper接口参数来传递分页参数
//        p.setProperty("supportMethodsArguments", "true");

//        always总是返回PageInfo类型,check检查返回类型是否为PageInfo,none返回Page
//        p.setProperty("returnPageInfo", "check");
        pageHelper.setProperties(p);
        return pageHelper;
    }
}
