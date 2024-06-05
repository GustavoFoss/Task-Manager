1 - Build the local graddle to install the project dependecies (to the project work needs jdk 22 and mysql 8 intalled at your pc)

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

      at the app settings insert you user and password for mysql
      
3 - run the backend that is the spring application at port 8080

4 - with the browser, use the html archive
