INSERT INTO departments (name)
VALUES ("Sales"),
       ("Customer Service"),
       ("Marketing"),
       ("Product Management"),
       ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Manager", 156531, 1), 
       ("Customer Service Manager", 120000, 2), 
       ("Marketing Manager", 140000, 3), 
       ("Product Manager", 180000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jane", "Doe", 2, 1),
       ("Bob", "Smith", 3, 2),
       ("Amy", "Johnson", 4, 3);
      