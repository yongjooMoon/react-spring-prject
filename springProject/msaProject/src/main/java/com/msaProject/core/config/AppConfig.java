package com.msaProject.core.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    // Java 기반 설정 추가 가능
	
// 자바 기반 config/xml 형태 빈 객체 선언
//	@Bean
//    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
//        PropertySourcesPlaceholderConfigurer configurer = new PropertySourcesPlaceholderConfigurer();
//        configurer.setLocations(new ClassPathResource("/config/application.xml"));
//        return configurer;
//    }
}