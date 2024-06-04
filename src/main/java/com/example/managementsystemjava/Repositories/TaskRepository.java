package com.example.managementsystemjava.Repositories;

import com.example.managementsystemjava.Entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
