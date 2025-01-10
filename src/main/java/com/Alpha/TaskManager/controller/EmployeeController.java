package com.Alpha.TaskManager.controller;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.Alpha.TaskManager.entity.Employee;
import com.Alpha.TaskManager.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping("/all-employees")
  public ResponseEntity<?> getAllEmployees() {
    List<Employee> employees = employeeService.getAllEmployees();
    if (employees != null && !employees.isEmpty()) {
      return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  @GetMapping("/read-employee/{empId}")
  public ResponseEntity<?> getEmployeeById(@PathVariable ObjectId empId) {
    Optional<Employee> employee = employeeService.getEmployeeById(empId);
    if (employee != null) {
      return new ResponseEntity<>(employee.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  @PutMapping("/update-employee")
  public ResponseEntity<?> updateEmployee(@RequestBody Employee employee) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String empName = authentication.getName();
    Employee employee1 = employeeService.getEmployeeByName(empName);
    if(employee.getRole() == null || employee.getRole().isEmpty()) {
      employee.setRole(List.of("Employee"));
    }
    if (employee1 != null) {
      employee1.setEmployeeName(employee.getEmployeeName());
      employee1.setPassword(employee.getPassword());
      employee1.setRole(employee.getRole());
      employeeService.saveEmployee(employee1);
      return new ResponseEntity<>("Updation of Employee is successfully completed", HttpStatus.OK);
    }
    return new ResponseEntity<>("Employee not exists", HttpStatus.NOT_FOUND);
  }

  @DeleteMapping("/delete-employee")
  public ResponseEntity<?> deleteEmployee() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    employeeService.deleteEmployeebyName(authentication.getName());
    return new ResponseEntity<>("Employee is successfully removed", HttpStatus.OK);
  }
}
