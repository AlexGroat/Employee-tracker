/* Use employees database */

INSERT INTO department (name)
VALUES 
('Web Development'),
('Legal'),
('Finance'),
('Sales'),
('Human Resources'),
('Reception');

INSERT INTO role (title, salary, department_id)
VALUES
('Engineer', 100000, 1),
('Lawyer', 120000, 2),
('Accountant', 90000, 3),
('Sales Rep', 70000, 4),
('HR Advisor', 80000, 5),
('Receptionist', 60000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
(''),
(''),
(''),
(''),
(''),
(''),