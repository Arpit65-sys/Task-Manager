package com.Alpha.TaskManager.entity;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Document(collection = "task_entries")
public class Task { 

  @Id
  private ObjectId taskId;
  
  @NonNull
  private String taskName;
  private String taskDetails;
  private String taskStatus;
  private LocalDateTime dueDate;

}

