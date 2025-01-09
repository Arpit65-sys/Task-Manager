package com.Alpha.TaskManager.controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Alpha.TaskManager.entity.Employee;
import com.Alpha.TaskManager.entity.Task;
import com.Alpha.TaskManager.service.EmployeeService;
import com.Alpha.TaskManager.service.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @Autowired
  private EmployeeService employeeService;

  @GetMapping("/read-all/{employeeName}")
  public ResponseEntity<?> getAllTasksOfEmployees(@PathVariable String employeeName) {
    Employee employee = employeeService.getEmployeeByName(employeeName);
    List<Task> taskAll = employee.getTasks();
    if (taskAll != null && !taskAll.isEmpty()) {
      return new ResponseEntity<>(taskAll, HttpStatus.OK);
    }
    return new ResponseEntity<>("No task exists for you !!!!", HttpStatus.NOT_FOUND);
  }

  @PostMapping("/create-task/{employeeName}")
  public ResponseEntity<?> createTask(@RequestBody Task task, @PathVariable String employeeName) {
    try {
      taskService.saveTask(task, employeeName);
      return new ResponseEntity<>(task, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(task, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/id/{taskId}")
  public ResponseEntity<?> getTaskById(@PathVariable ObjectId taskId) {
    Task task = taskService.getTaskById(taskId).orElse(null);
    if (task != null) {
      return new ResponseEntity<>(task, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  @DeleteMapping("/id/{employeeName}/{taskId}")
  public ResponseEntity<?> deleteTask(@PathVariable String employeeName, @PathVariable ObjectId taskId) {
    Boolean bool = taskService.deleteTask(employeeName, taskId);
    if (bool) {
      return new ResponseEntity<>(bool, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  @PutMapping("/id/{employeeName}/{taskId}")
  public ResponseEntity<?> updateTask(
      @PathVariable String employeeName,
      @PathVariable ObjectId taskId,
      @RequestBody Task newTask) {
    boolean isUpdated = taskService.updateTask(taskId, newTask, employeeName);
    if (isUpdated) {
      return new ResponseEntity<>(HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
  }

}
