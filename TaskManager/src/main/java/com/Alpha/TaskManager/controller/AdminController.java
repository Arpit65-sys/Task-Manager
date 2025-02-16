package com.Alpha.TaskManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Alpha.TaskManager.entity.Employee;
import com.Alpha.TaskManager.service.EmployeeService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Updated CORS settings
public class AdminController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping("/all-employees")
  public ResponseEntity<?> getAllEmployees() {
    List<Employee> employees = employeeService.getAllEmployees();
    if(employees != null && !employees.isEmpty()) {
      return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    return new ResponseEntity<>("Employees are not exists !!!!", HttpStatus.NOT_FOUND);
  }

  @PostMapping("/create-admin")
  public ResponseEntity<?> createAdmin(@RequestBody Employee employee){
    try {
      if(employee.getRole() == null || employee.getRole().isEmpty()) {
        employee.setRole(List.of("ADMIN"));
      }
      employeeService.saveNewEmployee(employee);
      return new ResponseEntity<>(employee, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>("Something went wrong try again with another username !!!", HttpStatus.BAD_REQUEST);
    }
  }
  
  @PostMapping("/signup")
  public ResponseEntity<?> signUpEmployee(@RequestBody Employee employee) {
    if (employee.getRole() == null || employee.getRole().isEmpty()) {
      employee.setRole(List.of("USER")); // Assign a default role
    }
    employeeService.saveNewEmployee(employee);
    return new ResponseEntity<>(employee, HttpStatus.CREATED);
  }
}
