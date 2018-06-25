package lzy.sys.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

/**
 * User: longzhiyou
 * Date: 2017/11/22
 * Time: 18:26
 */
@Configuration
public class SpringDataRestConfigure extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        config.getCorsRegistry().addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET","POST","OPTIONS","PUT","DELETE");
    }

}
