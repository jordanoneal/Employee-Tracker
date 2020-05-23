DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL, 
    department_id INT,
	PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("Jordan", "O'Neal", 1),
("Sierra", "Raso", 2);

INSERT INTO role (title, salary)
VALUES
("Sales Lead", 45000),
("Salesperson", 10000);

SELECT * FROM role;
SELECT * FROM employee;

SELECT first_name, last_name, title
FROM employee
INNER JOIN role ON employee.role_id = role.id

