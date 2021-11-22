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

