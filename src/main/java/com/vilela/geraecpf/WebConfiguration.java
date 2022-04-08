package com.vilela.geraecpf;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
	   @Override
	   public void addResourceHandlers(ResourceHandlerRegistry registry) {
	       registry.addResourceHandler("/static/**")
	               .addResourceLocations("classpath:/static")
	               .addResourceLocations("file:/static")
	               .addResourceLocations("classpath:/resources/static")
	               .addResourceLocations("file:/static");
	       registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
	   }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/", "/index.html");
    }
}