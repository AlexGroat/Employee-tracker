// import required modules and packages
const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');

// create connection to sql database

const connect = mysql.createConnection({
    host: 'localhost',
    port: 3301,
    user: 'root',
    password: '@Hawthorn08',
    database: 'employees_db'
})

var figlet = require('figlet');
figlet('Employee \n Management \n System', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

// create inquirer prompts with choices

/* 
view all departments
view all roles
view all employees
add a department
add a role
add an employee
update role
*/

// create functions based on what is selected in the choices
