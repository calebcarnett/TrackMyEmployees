const express = require('express');
const inquirer = require('inquirer');
require('dotenv').config();
// Import and require mysql2
const mysql = require('mysql2');


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

inquirer.prompt([
  {
    type: 'list',
    message: 'what would you like to do?',
    choices: ["View All Roles","View All Departments","View All Employees","Add Role", "Add Employee", "Add Department","Update Employee Payroll",],
    name: 'main' 
  },
  {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'employee', 
    when: (input) => input.main === "Add Department"
  }


]).then((employeeData) => {

  const { main } = employeeData;

switch(main) {
  case "View All Departments":
    db.query('SELECT * FROM departments', function (err, results) {
      console.table(results)
    });  
    break;
  case "View All Roles":
    db.query('SELECT title as Title, department_id as Department, salary as Salary FROM roles LEFT JOIN departments ON roles.department_id = departments.name;', function (err, results) {
      console.table(results);
          });
    break;
  case "View All Employees":
    db.query('SELECT * FROM employees', function (err, results) {
      console.table(results)
          });  
          break;
  case "Add Role":
       rolesPrompt();
          break;
  case "Add Employee":
       employeePrompt();
          break;
}
});


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
      message: 'What department does the role belong to?'
    },
  ])
  .then(answers => {
    db.query(
      'INSERT INTO roles SET ?',
      {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.department_id
      },
      (error) => {
        if (error) throw error;
        console.log('Role added successfully!');
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
  when: (input) => input.main === "Add Employee"
},
{
  type: 'input',
  message: 'What is the employees last name?',
  name: 'lastname', 
  when: (input) => input.main === "Add Employee"
},
{
  type: 'input',
  message: 'What is the employees role?',
  name: 'employeesRole', 
  when: (input) => input.main === "Add Employee"
},
{
  type: 'input',
  message: 'What is the employees manager?',
  name: 'employeeManager', 
  when: (input) => input.main === "Add Employee"
},
])
.then(answers => {
  db.query(
    'INSERT INTO employees SET ?',
    {
      title: answers.title,
      salary: answers.salary,
      department_id: answers.department_id
    },
    (error) => {
      if (error) throw error;
      console.log('Role added successfully!');
    }
  );
});
}



