package com.ebirdspace;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.annotation.PostConstruct;

@SpringBootApplication
@EntityScan(basePackageClasses = {
    TestAppApplication.class,
})
public class TestAppApplication {

  @PostConstruct
  void init() {

  }

  public static void main(String[] args) {
    SpringApplication.run(TestAppApplication.class, args);
  }
}

