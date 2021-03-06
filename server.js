// import required modules and packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

// employee management system graphic at start of node server.js
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
// DONT PUSH TO BRANCH AGAIN AS PWORD IS CONNECTED
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
                'Add an employee',
                'Add a role',
                'Update a role',
                'QUIT'
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

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Update a role':
                    updateRole();
                    break;

                case 'QUIT':
                    connection.end();
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

// view employees from select menu
function viewEmployees() {
    const query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Employees:', res);
        selectMenu();
    })
}

// view roles from select menu
function viewRoles() {
    const query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        selectMenu();
    });
}

// insert a new department into the department table
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
            // use template literals to include user input in the sql query
            const query = `INSERT INTO department (name) VALUES("${newDepartment}")`; // add template literal into the sql query
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
                selectMenu();
            });
        });
}

// insert a new employee into the employee table
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the first name of the new employee?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the last name of the new employee?',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'What is the role ID of the new employee?',
                name: 'roleID'
            },
            {
                type: 'input',
                message: 'What is the manager ID of the new employee?',
                name: 'managerID'
            }
        ])
        .then(function (res) {
            // create constructor which assigns the user response
            const firstName = res.firstName;
            const lastName = res.lastName;
            const roleID = res.roleID;
            const managerID = res.managerID;
            // use template literals to insert user response into the sql query
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
                selectMenu();
            });
        });
}

// add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name for the new role?',
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary for the new role?',
                name: 'roleSalary',
            },
            {
                type: 'input',
                message: 'What is the new role department ID?',
                name: 'newRoleID'
            }
        ])
        .then(function (res) {
            const roleName = res.roleName;
            const roleSalary = res.roleSalary;
            const newRoleID = res.newRoleID;
            const query = `INSERT INTO role (title, salary, department_id) VALUES("${roleName}", "${roleSalary}", "${newRoleID}")`;
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
                selectMenu();
            });
        });
}

// update a role
updateRole= () => {
    connection.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;
        // maps a new array with the relevant information which will be displayed in the inquirer prompt
        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
            // upon selection it will update the selected team members information
            .then(answer => {
                connection.query(`SELECT * FROM role`, (err, data) => {
                    if (err) throw err;
                    const employee = answer.name;
                    const roles = data.map(({ id, title }) => ({ name: title, value: id }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: `What is the employee's new role?`,
                            choices: roles
                        }
                    ])
                        .then(answer => {
                            const role = answer.role;
                            const arr = [role, employee];
                            connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, arr, (err, result) => {
                                if (err) throw err;
                                selectMenu();
                            })
                        })
                })
            });
    });
}