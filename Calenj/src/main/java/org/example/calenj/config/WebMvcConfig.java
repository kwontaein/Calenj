package org.example.calenj.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


public class WebMvcConfig implements WebMvcConfigurer {
    /* @Override
     public void addCorsMappings(CorsRegistry registry) {//http://localhost:3000
         registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET");
     }*/
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOriginPatterns("*");
            }
        };
    }
}