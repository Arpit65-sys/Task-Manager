package com.Alpha.TaskManager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/public")
public class PublicController {


  @GetMapping("/check-in")
  public String heathCheck(){
    return "Task Manager is running";
  }

}
