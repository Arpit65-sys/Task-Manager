package com.Alpha.TaskManager.repository;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.Alpha.TaskManager.entity.Task;

public interface TaskRepository extends MongoRepository<Task, ObjectId> {

}
