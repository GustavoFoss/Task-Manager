1 - Build the local graddle to install the project dependecies

2 - sql script of the database

      CREATE DATABASE IF NOT EXISTS task_management;

      USE task_management;
      
      CREATE TABLE IF NOT EXISTS Task (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL,
          creation_date DATETIME NOT NULL
      );
3 - run the backend that is the spring application at port 8080
