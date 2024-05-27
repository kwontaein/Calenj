package org.example.calenj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CalenjApplication {

    public static void main(String[] args) {

        SpringApplication.run(CalenjApplication.class, args);
    }

}
