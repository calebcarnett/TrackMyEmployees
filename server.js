const express = require('express');
const inquirer = require('inquirer');
require('dotenv').config();
// Import and require mysql2
const mysql = require('mysql2');

require('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employee_db database.`)
);

function menu() {

inquirer.prompt([
  {
    type: 'list',
    message: 'what would you like to do?',
    choices: ["View All Roles","View All Departments","View All Employees","Add Role", "Add Employee", "Add Department","Update Employee Role",],
    name: 'main' 
  },

]).then((employeeData) => {

  const { main } = employeeData;

switch(main) {
  case "View All Departments":
    db.query('SELECT name FROM departments', function (err, results) {
      console.table(results)
      menu();
    });  
    break;
  case "View All Roles":
    db.query('SELECT title as Title, department_id as Department, salary as Salary FROM roles LEFT JOIN departments ON roles.department_id = departments.name;', function (err, results) {
      console.table(results);
          });
          menu();
    break;
  case "View All Employees":
    db.query('SELECT * FROM employees;', function (err, results) {
      console.table(results)
      menu();
          });  
          break;
  case "Add Role":
       rolesPrompt();
          break;
  case "Add Employee":
       employeePrompt();
          break;
  case "Add Department":
      departmentPrompt();
          break;
}
});
}

//added a prompt to insert roles 
function rolesPrompt() {
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the role salary?'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What is the department id for this role?'
    },
  ])
  .then(answers => {
    db.query(
      'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)',
      [
        answers.title,
        answers.salary,
        answers.department_id
      ],
      (error) => {
        if (error) throw error;
        console.log('Role added successfully!');
        db.query('SELECT title as Title, department_id as Department, salary as Salary FROM roles LEFT JOIN departments ON roles.department_id = departments.name;', function (err, results) {
          console.table(results);
          menu();
              });
      }
    );
  });
}

function employeePrompt() {
  inquirer
    .prompt([
{
  type: 'input',
  message: 'What is the employees first name?',
  name: 'firstname', 

},
{
  type: 'input',
  message: 'What is the employees last name?',
  name: 'lastname', 

},
{
  type: 'input',
  message: 'What is the employees role?',
  name: 'employeesRole', 

},
{
  type: 'input',
  message: 'What is the employees manager?',
  name: 'employeeManager', 

},
])
.then(answers => {
  db.query(
    'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
    [
      answers.first_name,
      answers.last_name,
      answers.role_id,
      answers.manager_id
    ],
    (error) => {
      if (error) throw error;
      console.log('Employee added successfully!');
      db.query('SELECT * FROM employees;', function (err, results) {
        console.table(results)
        menu();
            }); 
    }
  );
});
}

function departmentPrompt() {
  inquirer
    .prompt([
{
  type: 'input',
  message: 'What is the name of the department?',
  name: 'departmentname', 
},
])
.then(answers => {
  db.query(
    'INSERT INTO departments(name) VALUES (?)',
    [
      answers.name
    ],
    (error) => {
      if (error) throw error;
      console.log('Department added successfully!');
      db.query('SELECT * FROM departments;', function (err, results) {
        console.table(results)
        menu();
            }); 
    }
  );
});
}

menu();





