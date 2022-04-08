INSERT INTO department (department_name)
VALUES
('Engineer'),
('Sales'),
('Human Resources'),
('Customer Service'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 60000.00, 2),
('Account Manager', 70000.00, 5),
('Lawyer', 100000.00, 6),
('Accountant', 90000.00, 5),
('Customer Service Lead', 450000.00, 4),
('Financal Advisor', 80000.00, 5),
('Human Resources Director', 80000.00, 3),
('Software Engineer', 100000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Madison', 'Schaaf', 8, 1),
('Mike', 'Smith', 3, 2),
('John', 'Doe', 1, 3),
('Stephanie', "Johnson", 6, 4),
('Jane', 'Jones', 7, 5);