// import required modules and packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

var figlet = require('figlet');
figlet('Employee \n Management \n System', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

// create connection (coding standard to name connection) to sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees_db'
});


// connect to server and db
connection.connect(function (err) {
    if (err) throw err;
    selectMenu();
});

function selectMenu() {
    inquirer
        .prompt({
            type: 'list',
            name: 'option',
            message: 'Welcome to the employee database! Please select an option from the menu below.',
            choices: [
                'View all departments',
                'View all employees',
                'View all roles',
                'Add a department',
            ]
        }).then(function (answer) {
            switch (answer.option) {

                // case handle which selection the user clicks and runs the appropriate function upon selection

                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case ' Add a department':
                    addDepartment();
                    break;

                default:
                    break;
            }
        })
}

// add functions to correlating choices in select menu


// view department from select menu
function viewDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Departments:', res);
        selectMenu();
    })
}

function viewEmployees() {
    const query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Employees:', res);
        selectMenu();
    })
}

function viewRoles() {
    const query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        selectMenu();
    });
}

function addDepartment() {
    inquirer
        .prompt(
            {
                type: 'input',
                message: 'What is the name of the department you wish to add?',
                name: 'department'
            })
        .then(function (res) {
            // assigns user input into a variable which can be entered with template literals
            const newDepartment = res.department;
            const query = `INSERT INTO department (name) VALUES("${newDepartment}")`; // add template literal into the sql query
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
                selectMenu();
            });
        });
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



