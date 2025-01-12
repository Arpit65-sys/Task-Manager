package com.Alpha.TaskManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Alpha.TaskManager.entity.Employee;
import com.Alpha.TaskManager.service.EmployeeService;


@RestController
@RequestMapping("/public")
public class PublicController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping("/check-in")
  public String heathCheck(){
    return "Task Manager is running";
  }

  @PostMapping("/create-employee")
  public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
    if (employee.getRole() == null || employee.getRole().isEmpty()) {
      employee.setRole(List.of("USER")); // Assign a default role
    }
    employeeService.saveNewEmployee(employee);
    return new ResponseEntity<>(employee, HttpStatus.CREATED);
  }

}
