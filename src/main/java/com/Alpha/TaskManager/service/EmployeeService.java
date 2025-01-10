package com.Alpha.TaskManager.service;


import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.Alpha.TaskManager.entity.Employee;
import com.Alpha.TaskManager.repository.EmployeeRepository;

@Service
@Component
public class EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;

  private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public void saveEmployee(Employee employee) {
    employee.setPassword(passwordEncoder.encode(employee.getPassword()));
    employeeRepository.save(employee);
  }

  public void saveNewEmployee(Employee employee) {
    employeeRepository.save(employee);
  }

  public List<Employee> getAllEmployees() {
    return employeeRepository.findAll();
  }

  public Optional<Employee> getEmployeeById(ObjectId EmployeeId) {
    return employeeRepository.findById(EmployeeId);
  }
  
  public Employee getEmployeeByName(String employeeName) {
    return employeeRepository.findByEmployeeName(employeeName);
  }

  public void deleteEmployeebyId(ObjectId empId) {
    employeeRepository.deleteById(empId);
  }

  public void deleteEmployeebyName(String name) {
    employeeRepository.deleteByEmployeeName(name);
  }

}
