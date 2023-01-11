INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Sales"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 156531, 1), 
       ("Salesperson", 120000, 2), 
       ("Lead Engineer", 140000, 3), 
       ("Software Engineer", 180000, 4),
       ("Account Manager", 180000, 4),
       ("Accountant", 180000, 4),
       ("Legal Team Lead", 180000, 4),
       ("Lawyer", 180000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jane", "Doe", 2, 1),
       ("Bob", "Smith", 3, 2),
       ("Amy", "Johnson", 4, 3);
      