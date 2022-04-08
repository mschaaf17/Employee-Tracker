INSERT INTO department (department_name)
VALUES
('Engineer'),
('Sales'),
('Human Resources'),
('Customer Service'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 60000.00, 1),
('Account Manager', 70000.00, 2),
('Lawyer', 100000.00, 3),
('Accountant', 90000.00, 4),
('Customer Service Lead', 450000.00, 5),
('Financal Advisor', 80000.00, 6),
('Human Resources Director', 80000.00, 7),
('Software Engineer', 100000.00, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Madison', 'Schaaf', 1, 1),
('Mike', 'Smith', 2, 2),
('John', 'Doe', 3, 3),
('Stephanie', "Johnson", 4, 4),
('Jane', 'Jones', 5, 5);