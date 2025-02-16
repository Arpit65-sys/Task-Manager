package com.Alpha.TaskManager.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.Alpha.TaskManager.entity.Employee;
import com.Alpha.TaskManager.entity.Task;
import com.Alpha.TaskManager.service.EmployeeService;
import com.Alpha.TaskManager.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Updated CORS settings
public class TaskController {

  @Autowired
  private TaskService taskService;

  @Autowired
  private EmployeeService employeeService;

  @GetMapping("/read-all")
  public ResponseEntity<?> getAllTasksOfEmployees() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String employeeName = authentication.getName();
    Employee employee = employeeService.getEmployeeByName(employeeName);
    List<Task> taskAll = employee.getTasks();
    if (taskAll != null && !taskAll.isEmpty()) {
      return new ResponseEntity<>(taskAll, HttpStatus.OK);
    }
    return new ResponseEntity<>("No task exists for you !!!!", HttpStatus.NOT_FOUND);
  }

  @PostMapping("/create-task")
  public ResponseEntity<?> createTask(@RequestBody Task task) {
    try {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      String employeeName = authentication.getName();
      taskService.saveTask(task, employeeName);
      return new ResponseEntity<>(task, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(task, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/id/{taskId}")
  public ResponseEntity<?> getTaskById(@PathVariable ObjectId taskId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String employeeName = authentication.getName();
    Employee employee = employeeService.getEmployeeByName(employeeName);
    List<Task> collect = employee.getTasks().stream().filter(task -> task.getTaskId().equals(taskId)).collect(Collectors.toList());
    if (!collect.isEmpty()) {
      Optional<Task> task = taskService.getTaskById(taskId);
      if (task.isPresent()) {
        return new ResponseEntity<>(task.get(), HttpStatus.OK);
      }
    }
    return new ResponseEntity<>("Task is not found", HttpStatus.NOT_FOUND);
  }

  @DeleteMapping("/id/{taskId}")
  public ResponseEntity<?> deleteTask(@PathVariable ObjectId taskId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String employeeName = authentication.getName();
    Boolean bool = taskService.deleteTask(employeeName, taskId);
    if (bool) {
      return new ResponseEntity<>("Task is deleted successfully", HttpStatus.OK);
    }
    return new ResponseEntity<>("Task is not found", HttpStatus.NOT_FOUND);
  }

  @PutMapping("/id/{taskId}")
  public ResponseEntity<?> updateTask(@PathVariable ObjectId taskId, @RequestBody Task newTask) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String employeeName = authentication.getName();
    Employee employee = employeeService.getEmployeeByName(employeeName);
    List<Task> collect = employee.getTasks().stream().filter(task -> task.getTaskId().equals(taskId)).collect(Collectors.toList());
    if (!collect.isEmpty()) {
      boolean isUpdated = taskService.updateTask(taskId, newTask, employeeName);
      if (isUpdated) {
        return new ResponseEntity<>("Task is succussfully updated" ,HttpStatus.OK);
      } 
    }
    return new ResponseEntity<>("NOT Updated retry", HttpStatus.NOT_MODIFIED);
  }

}
