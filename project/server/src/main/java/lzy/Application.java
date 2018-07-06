package lzy;

import lzy.sys.file.storage.StorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

//@EnableWebSecurity
//@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)

@SpringBootApplication
@EnableJpaAuditing
@EnableCaching
@EnableScheduling
@EnableConfigurationProperties(StorageProperties.class)

public class Application {

    @Autowired
    private RestTemplateBuilder builder;

    // 使用RestTemplateBuilder来实例化RestTemplate对象，spring默认已经注入了RestTemplateBuilder实例
    @Bean
    public RestTemplate restTemplate() {
        return builder.build();
    }

    @Bean
    public ScriptEngineManager getScriptEngineManager(){
        return new ScriptEngineManager();
    }

    @Bean
    public ScriptEngine getScriptEngine(ScriptEngineManager scriptEngineManager){
        return scriptEngineManager.getEngineByName("groovy");

    }

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }
}
