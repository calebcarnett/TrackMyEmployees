INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Sales"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 156531, 3), 
       ("Salesperson", 120000, 3), 
       ("Lead Engineer", 140000, 1), 
       ("Software Engineer", 180000, 1),
       ("Account Manager", 180000, 3),
       ("Accountant", 180000, 2),
       ("Legal Team Lead", 180000, 4),
       ("Lawyer", 180000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jane", "Doe", 2, 2),
       ("Bob", "Smith", 3, NULL),
       ("Amy", "Johnson", 4, 3);
      