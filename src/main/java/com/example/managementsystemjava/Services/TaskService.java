package com.example.managementsystemjava.Services;

import com.example.managementsystemjava.Entities.Status;
import com.example.managementsystemjava.Entities.Task;
import com.example.managementsystemjava.Repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        if (isWeekday()) {
            return taskRepository.save(task);
        }
        throw new RuntimeException("Tasks can only be created during weekdays");
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        if (task.getStatus() != Status.PENDING) {
            throw new RuntimeException("Tasks can only be updated if in status pending");
        }
        task.setStatus(taskDetails.getStatus());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        if (task.getStatus() != Status.PENDING) {
            throw new RuntimeException("Tasks can only be deleted if in status pending");
        }
        taskRepository.delete(task);
    }

    private boolean isWeekday() {
        DayOfWeek day = LocalDateTime.now().getDayOfWeek();
        return day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY;
    }
}
