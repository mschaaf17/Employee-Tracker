INSERT INTO department (department_name)
VALUES
('Engineer'),
('Sales'),
('Human Resources'),
('Customer Service'),
('Finance'),
('Legal');

INSERT INTO roles (department_id, title, salary)
VALUES
(2, 'Sales Lead', 60000.00),
(5, 'Account Manager', 70000.00),
(6, 'Lawyer', 100000.00),
(5, 'Accountant', 90000.00),
(4, 'Customer Service Lead', 450000.00),
(5, 'Financal Advisor', 80000.00),
(3, 'Human Resources Director', 80000.00),
(1, 'Software Engineer', 100000.00);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Madison', 'Schaaf', 8, 1),
('Mike', 'Smith', 3, 2),
('John', 'Doe', 1, 3),
('Stephanie', "Johnson", 6, 4),
('Jane', 'Jones', 7, 5);