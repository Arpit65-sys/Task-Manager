package com.Alpha.TaskManager.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Alpha.TaskManager.entity.Employee;
import com.Alpha.TaskManager.entity.Task;
import com.Alpha.TaskManager.repository.TaskRepository;
import java.time.LocalDateTime;

@Service
@Component
public class TaskService {

  @Autowired
  private TaskRepository taskRepository;

  @Autowired
  private EmployeeService employeeService;

  @Transactional
  public void saveTask(Task task, String employeeName) {
    try {
      Employee employee = employeeService.getEmployeeByName(employeeName);
      task.setDueDate(LocalDateTime.now().plusDays(7));
      Task savedTask = taskRepository.save(task);
      employee.getTasks().add(savedTask);
      employeeService.saveEmployee(employee);
    } catch (Exception e) {
      System.out.println(e);
      throw new RuntimeException("Error while saving task", e);
    }
  }

  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }

  public Optional<Task> getTaskById(ObjectId taskId) {
    return taskRepository.findById(taskId);
  }

  @Transactional
  public Boolean deleteTask(String employeeName, ObjectId taskId) {
    try {
      Employee employee = employeeService.getEmployeeByName(employeeName);
      boolean removed = employee.getTasks().removeIf(task -> task.getTaskId().equals(taskId));
      if (removed) {
        employeeService.saveEmployee(employee);
        taskRepository.deleteById(taskId);
        return true;
      }
      return false;
    } catch (Exception e) {
      System.out.println(e);
      throw new RuntimeException("Error while deleting task", e);
    }
  }

  public boolean updateTask(ObjectId taskId, Task newTask, String employeeName) {
    // Fetch the employee by employeeName
    Employee employee = employeeService.getEmployeeByName(employeeName);
    if (employee == null) {
      return false; // Employee not found
    }

    // Find the task within the employee's task list
    Task existingTask = employee.getTasks().stream()
        .filter(task -> task.getTaskId().equals(taskId))
        .findFirst()
        .orElse(null);

    if (existingTask != null) {
      // Update only non-null and non-empty fields
      if (newTask.getTaskName() != null && !newTask.getTaskName().isEmpty()) {
        existingTask.setTaskName(newTask.getTaskName());
      }
      if (newTask.getTaskDetails() != null && !newTask.getTaskDetails().isEmpty()) {
        existingTask.setTaskDetails(newTask.getTaskDetails());
      }
      if (newTask.getTaskStatus() != null && !newTask.getTaskStatus().isEmpty()) {
        existingTask.setTaskStatus(newTask.getTaskStatus());
      }
      if (newTask.getDueDate() != null) {
        existingTask.setDueDate(newTask.getDueDate());
      }

      // Save the updated task to the repository
      taskRepository.save(existingTask);

      // Update the employee's task list and save the employee
      employeeService.saveEmployee(employee);

      return true;
    }

    return false; // Task not found in the employee's task list
  }

}