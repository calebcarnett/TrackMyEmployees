const express = require("express");
const inquirer = require("inquirer");
require("dotenv").config();
// Import and require mysql2
const mysql = require("mysql2");
const { ConnectionAcquireTimeoutError } = require("sequelize");

require("console.table");

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the company_db database.`)
);


function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what would you like to do?",
        choices: [
          "View All Roles",
          "View All Departments",
          "View All Employees",
          "Add a Role",
          "Add an Employee",
          "Add a Department",
          "Update an Employee Role",
        ],
        name: "main",
      },
    ])
    .then((employeeData) => {
      const { main } = employeeData;
//switch statement for prompts
      switch (main) {
        case "View All Departments":
          db.query("SELECT id, name FROM departments", function (err, results) {
            console.table(results);
            menu();
          });
          break;
        case "View All Roles":
          db.query(
            "SELECT roles.id, title as Title, department_id as Department, salary as Salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id;",
            function (err, results) {
              console.table(results);
              menu();
            }
          );
          break;
        case "View All Employees":
          db.query(
            'SELECT employees.id, employees.first_name, employees.last_name, title, departments.name AS department, salary, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees AS m ON employees.manager_id = m.id LEFT JOIN departments on roles.department_id = departments.id',
            function (err, results) {
              console.table(results);
              menu();
            }
          );
          break;
        case "Add a Role":
          rolesPrompt();
          break;
        case "Add an Employee":
          employeePrompt();
          break;
        case "Add a Department":
          departmentPrompt();
          break;
        case "Update an Employee Role":
          updateEmployeePrompt();
          break;
      }
    });
}

//added a prompt to insert roles
function rolesPrompt() {
  // when rolesPrompt is called query names from departments
  db.query("SELECT * FROM departments", (err, data) => {
    if (err) throw err;
    // set array of mapped names to departmentNames
    const departmentNames = data.map(({ id, name }) => ({ name: name, value: id }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the role salary?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What is the department for this role?",
          // return the departmentNames array
          choices: departmentNames,
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
          [answers.title, answers.salary, answers.department_id],
          (error) => {
            if (error) throw error;
            console.log("Role added successfully!");
            db.query(
              "SELECT title as Title, department_id as Department, salary as Salary FROM roles LEFT JOIN departments ON roles.department_id = departments.name;",
              function (err, results) {
                console.table(results);
                menu();
              }
            );
          }
        );
      });
  });
}

function employeePrompt() {
  db.query('SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) AS Employee, title, departments.name AS department, salary, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees AS m ON employees.manager_id = m.id LEFT JOIN departments on roles.department_id = departments.id', (err, data) => {
    if (err) throw err;
    // set array of mapped names to departmentNames
    const roles = data.map(({ id, title}) => ({ name: title, value: id }));
    const manager = data.map(({ id, Employee}) => ({ name: Employee, value: id }));

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employees first name?",
        name: "firstname",
      },
      {
        type: "input",
        message: "What is the employees last name?",
        name: "lastname",
      },
      {
        type: "list",
        message: "What is the employees role?",
        name: "employeesRole",
        choices: roles,
      },
      {
        type: "list",
        message: "What is the employees manager?",
        name: "employeeManager",
        choices: manager,
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          answers.firstname,
          answers.lastname,
          answers.employeesRole,
          answers.employeeManager,
        ],
        (error) => {
          if (error) throw error;
          console.log("Employee added successfully!");
          db.query( 'SELECT employees.id, employees.first_name, employees.last_name, title, departments.name AS department, salary, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees AS m ON employees.manager_id = m.id LEFT JOIN departments on roles.department_id = departments.id', function (err, results) {
            console.table(results);
            menu();
          }
          );
        }
      );
    });
});
}

function departmentPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "departmentname",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO departments(name) VALUES (?)",
        [answers.departmentname],
        (error) => {
          if (error) throw error;
          console.log("Department added successfully!");
          db.query("SELECT * FROM departments;", function (err, results) {
            console.table(results);
            menu();
          });
        }
      );
    });
}

function updateEmployeePrompt() {
  db.query('SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.role_id = roles.id', (err, data) => {
    if (err) throw err;
    // set array of mapped names to departmentNames
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which is the employee id of the employee you want to update?",
        name: "whichEmployee",
     
      },
      {
        type: "input",
        message: "What is the new role of this employee?",
        name: "assignedRole",

      },
    ])
    .then((answers) => {
      db.query(
        "UPDATE employees SET role_id = ? WHERE id = ?", 
        [
          answers.whichEmployee, 
          answers.newRole
        ],
      ); menu();
    });
}
  )}

menu();
