const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table');



//start of questions
const firstPrompt = userResponse => {
    console.log('Please answer the questions to build your team.')
    return inquirer.prompt([
        {
            type: 'list',
            name: 'firstChoice',
            message: "What would you like to do?",
            choices: ['View', 'Add', 'Update an Employee', 'Exit']

        }
    ]).then((userResponse) => {
        if (userResponse.firstChoice === "View") {
            viewQuestions(userResponse)
        } else if (userResponse.firstChoice === "Add") {
            addQuestions(userResponse)
        } else if (userResponse.firstChoice === "Update an Employee") {
            updateEmployee(userResponse)
        } else {
            console.log('Thank you for your participation.')
            setTimeout((function () {
                return process.exit(22);
            }), 1000);
        }
    })
}

//view departments, roles, and employee tables
const viewQuestions = (userResponse) => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'viewOptions',
            message: 'What would you like to view?',
            choices: ['Departments', 'Roles', 'Employees']
        }
    ]).then((userResponse) => {
        if (userResponse.viewOptions === "Departments") {
            console.log('Here is your departments table')
            db.query(`SELECT * FROM department`, (err, row) => {
                console.table(row)
                firstPrompt()
            })
        } else if (userResponse.viewOptions === "Roles") {
            console.log('Here is a table of employee roles')
            db.query(`SELECT roles.*, department.department_name FROM roles LEFT JOIN department ON roles.department_id = department.id;`, (err, row) => {
                console.table(row)
                firstPrompt()
            })
        } else {
            console.log('Here is a table of employees')
            db.query(`SELECT employee.*, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id;`, (err, row) => {
                console.table(row)
                firstPrompt()
            })
        }
    })

}



//pick an area to add to 
const addQuestions = (userResponse) => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addOptions',
            message: 'What would you like to add to?',
            choices: ['Departments', 'Roles', 'Employees']
        }
    ]).then((userResponse) => {
        if (userResponse.addOptions === "Departments") {
            addDepartment(userResponse)
        } else if (userResponse.addOptions === "Roles") {
            addRole(userResponse)
        } else {
            addEmployee(userResponse)
        }
    })
}

//adding a department
const addDepartment = (userResponse) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department you would like to add.'

        }
    ]).then(departmentNameData => {
        db.query(`INSERT INTO department (department_name) VALUES ('${departmentNameData.departmentName}');`, (err) => {
            console.log(`You added a new deparment named: ${departmentNameData.departmentName}, to view, continue through prompts.`)
            firstPrompt()
        })

    })
}

//adding a role
const addRole = (userResponse) => {
    let departmentChoices = []
    db.query('SELECT department_name, id FROM department;', function (err, result) {
        if (err) throw err;

        result.forEach((row) => {
            departmentChoices.push({ name: row.department_name, value: row.id })
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'What department?',
                choices: departmentChoices
            },
            {
                type: 'input',
                name: 'roleName',
                message: 'Enter the name of the role you would like to add.'

            },
            {
                type: 'list',
                name: 'salary',
                message: 'What is the salary for this role?',
                choices: [100000.00, 90000.00, 80000.00, 70000.00, 60000.00, 50000.00, 40000.00]

            }

        ]).then(roleAddedData => {
            db.query(`INSERT INTO roles (department_id, title, salary) VALUES (${roleAddedData.departmentId},'${roleAddedData.roleName}', ${roleAddedData.salary});`)
            console.log(`You added a new role named: ${roleAddedData.roleName}, to view your updates, continue through the prompts.`)
            firstPrompt()
        })
    })

}

let roleChoices = []
db.query('SELECT id, title FROM roles;', function (err, result) {
    if (err) throw err;
    result.forEach((row) => {
        roleChoices.push({ name: row.title, value: row.id })
    })
})

//adding a Employee
const addEmployee = (userResponse) => {
    db.query('SELECT id, first_name, last_name FROM employee;', function (err, result) {
        if (err) throw err;
        const employeeChoices = []
        result.forEach((row) => {
            employeeChoices.push({ name: row.first_name + " " + row.last_name, value: row.id })
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee you would like to add.'

            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee you would like to add.'
            },
            {
                type: 'list',
                name: 'employeeRole',
                message: "Pick the employee's role.",
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'employeeManager',
                message: "Enter the name of the employee's manager.",
                choices: employeeChoices
            }
        ]).then(addedEmployeeData => {
            console.log(`you added a new employee: ${addedEmployeeData.firstName}-- then show the table`)
            console.log(addedEmployeeData)
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${addedEmployeeData.firstName}', '${addedEmployeeData.lastName}', ${addedEmployeeData.employeeRole}, ${addedEmployeeData.employeeManager});`, function(err){
                if(err) throw err;
                firstPrompt()
            })
            
        })
    })
}

//updating an employee
const updateEmployee = (userResponse) => {
    let employeeChoices = []
    db.query('SELECT first_name, last_name, id FROM employee;', function (err, result) {
        if (err) throw err;
        result.forEach((row) => {
            employeeChoices.push({ name: row.first_name + " " + row.last_name, value: row.id })
        })

        inquirer.prompt([
            {
                type: 'list',
                name: 'selectedEmployee',
                message: 'Pick an employee to update.',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'newRole',
                message: "What is the employee's new role?",
                choices: roleChoices

            }
        ]).then(updatedEmployeeData => {
            let choosenEmployee = `${updatedEmployeeData.selectedEmployee}`
            console.log(`You updated ${updatedEmployeeData.selectedEmployee}`)
            db.query(`UPDATE employee SET role_id = '${updatedEmployeeData.newRole}' WHERE id = '${updatedEmployeeData.selectedEmployee}';`, (err, result) => {
                if (err) {
                    console.log(err)
                }
            })
        })
    })
}

firstPrompt()

