package com.Alpha.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Alpha.TaskManager.entity.Employee;
import com.Alpha.TaskManager.repository.EmployeeRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private EmployeeRepository employeeRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Employee employee = employeeRepository.findByEmployeeName(username);
    if (employee != null) {
      return org.springframework.security.core.userdetails.User.builder()
          .username(employee.getEmployeeName())
          .password(employee.getPassword())
          .roles(employee.getRole().toArray(new String[0]))
          .build();
    }
    throw new UsernameNotFoundException("User not found with username: " + username);
  }
}