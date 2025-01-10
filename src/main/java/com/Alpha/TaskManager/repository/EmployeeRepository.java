package com.Alpha.TaskManager.repository;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.Alpha.TaskManager.entity.Employee;


public interface EmployeeRepository extends MongoRepository<Employee, ObjectId> {
  Employee findByEmployeeName(String employeeName);

  void deleteByEmployeeName(String name);
}

