package com.Alpha.TaskManager.entity;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.Data;

@Data
@Document(collection = "employee_entries")
public class Employee {

  @Id
  private ObjectId employeeId;
  
  @Indexed(unique = true)
  @NonNull
  private String employeeName;

  @NonNull
  private String password;

  private List<String> role = new ArrayList<>();

  @DBRef
  private List<Task> tasks = new ArrayList<>();
}
