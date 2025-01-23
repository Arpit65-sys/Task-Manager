package com.Alpha.TaskManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.Alpha.TaskManager.entity.Employee;
import com.Alpha.TaskManager.service.UserDetailsServiceImpl;
import com.Alpha.TaskManager.utilis.JwtUtil;

import lombok.extern.slf4j.Slf4j;


@RestController
@Slf4j 
@RequestMapping("/public")
public class PublicController {

  @Autowired
  private AuthenticationManager authenticationManager;
  
  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  @Autowired
  private JwtUtil jwtUtil;

  @GetMapping("/check-in")
  public String heathCheck(){
    return "Task Manager is running";
  }

  @PostMapping("/login")
  public ResponseEntity<?> loginEmployee(@RequestBody Employee employee) {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(employee.getEmployeeName(), employee.getPassword()));
      userDetailsService.loadUserByUsername(employee.getEmployeeName());
      String jwt = jwtUtil.generateToken(employee.getEmployeeName());
      return new ResponseEntity<>(jwt, HttpStatus.OK);
    } catch (Exception e) {
      log.error("Invalid username or password", e);
      return new ResponseEntity<>("Invalid username or password", HttpStatus.BAD_REQUEST);
    }

  }
}
