// import required modules and packages
const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');

// create connection (coding standard to name connection) to sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3301,
    user: 'root',
    password: '',
    database: 'employees_db'
})

// connect to server and db
connection.connect(function (err) {
    if (err) throw err;
    selectMenu();
})

var figlet = require('figlet');
figlet('Employee \n Management \n System', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

function selectMenu() {
    inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'Welcome to the employee database! Please select an option from the menu below.', 
            choices: [
                'View all departments',
            ]
        })
}



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
