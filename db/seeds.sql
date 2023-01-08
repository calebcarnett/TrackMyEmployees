INSERT INTO department (id, name)
VALUES (1,"Sales"),
       (2,"Customer Service"),
       (3,"Marketing"),
       (4,"Product Management"),
       (5,"Engineering");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1,"Sales", .156531, 1310), 
       (1,"Sales", .156531, 1310), 
       (1,"Sales", .156531, 1310), 
       (1,"Sales", .156531, 1310);
INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES (1,"Caleb","Carnett", 3, 1),
       (1,"Caleb","Carnett", 3, 2),
       (1,"Caleb","Carnett", 3, 3),
       (1,"Caleb","Carnett", 3, 4);
      