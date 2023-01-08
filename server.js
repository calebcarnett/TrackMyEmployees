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

inquirer.prompt([
  {
    type: 'list',
    message: 'what would you like to do?',
    choices: ["View All Roles","View All Departments", "View All Employees","Add Role", "Add Employee", "Add Department","Update Employee Payroll",],
    name: 'main'
    
  }
]).then((employeeData) => {

  const { main } = employeeData;

  if (main === "View All Departments") {
   db.query('SELECT * FROM departments', function (err, results) {
        console.table(results)
      });  
  } else if (main === "View All Roles"){
    db.query('SELECT * FROM roles', function (err, results) {
      console.table(results)
    });  
  } else if (main === "View All Employees"){
    db.query('SELECT * FROM employees', function (err, results) {
      console.table(results)
    });  
}
})



// const addEmployeePrompt = () => {
//   return inquirer.prompt([
//     type: "input",
//     message: "Enter employee name",
//     name: "EName",
//   ])
// }
// const updateEmployeePrompt = () => {
//   return inquirer.prompt([
//     type: "input",
//     message: "Enter employee name",
//     name: "EName",
//   ])
// }
// const ViewAllRolesPrompt = () => {
//   return inquirer.prompt([
//     type: "input",
//     message: "Enter employee name",
//     name: "EName",
//   ])
// }
// const AddRolesPrompt = () => {
//   return inquirer.prompt([
//     type: "input",
//     message: "Enter employee name",
//     name: "EName",
//   ])
// }
// // const ViewAllDepartmentsPrompt = () => {
//   return inquirer.prompt([
//     type: "input",
//     message: "Enter employee name",
//     name: "EName",
//   ])
// }
// const AddDepartmentPrompt = () => {
//   return inquirer.prompt([
//     type: "input",
//     message: "Enter employee name",
//     name: "EName",
//   ])
// }






app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
