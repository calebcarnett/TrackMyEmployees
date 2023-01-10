const express = require('express');
const inquirer = require('inquirer');
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
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
//Selects the employee table
// db.query('SELECT * FROM employee', function (err, results) {
//   console.log(results);
// });

inquirer.prompt([
  {
    type: 'list',
    message: 'what would you like to do?',
    choices: ["View All Roles","View All Departments","View All Employees","Add Role", "Add Employee", "Add Department","Update Employee Payroll",],
    name: 'main' 
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
}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//   if (main === "View All Departments") {
//    db.query('SELECT * FROM departments', function (err, results) {
//         console.table(results)
//       });  
//   } else if (main === "View All Roles"){
//     db.query('SELECT title as Title, department_id as Department, salary as Salary FROM roles LEFT JOIN departments ON roles.department_id = departments.name;', function (err, results) {
//       console.table(results);
//     });
//   } else if (main === "View All Employees"){
//     db.query('SELECT FROM employees', function (err, results) {
//       console.table(results)
//     });  
//   } 
// });
