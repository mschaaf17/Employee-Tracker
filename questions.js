const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table');
//may need this in here or in index.js
//const db = require('./db/connection')

console.table(`
               ---   
              |      |\  /|
               --    | \/ |
              |      |    |
               ---   |    |
(\__/)
(='.'=)
(\___/)
(")_(")
               
               
               `)

const firstPrompt = userResponse => {
    console.log('Please answer the questions to build your team.')
    return inquirer.prompt([
        {
            type: 'list',
            name: 'firstChoice',
            message: "What would you like to do?",
            choices: ['View', 'Add', 'Update an Employee', 'Exit']
        
        }
    ]) .then ((userResponse) => {
        if(userResponse.firstChoice === "View") {
            viewQuestions(userResponse)
        } else if (userResponse.firstChoice === "Add") {
            addQuestions(userResponse)
        } else if (userResponse.firstChoice === "Update an Employee") {
            updateEmployee(userResponse)
        } else {
          console.log('Thank you for your participation.')
          setTimeout((function() {
              return process.exit(22);
          }), 1000);
        }
    })
}

        const viewQuestions = (userResponse) => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'viewOptions',
                    message: 'What would you like to view?',
                    choices: ['Departments', 'Roles', 'Employees']
                }
            ]).then ((userResponse)=> {
                if(userResponse.viewOptions === "Departments") {
                    console.log('Here is your departments table')
                    db.query(`SELECT * FROM department`, (err, row)=> {
                        console.table(row)
                        firstPrompt()
                    })
                } else if (userResponse.viewOptions === "Roles") {
                    console.log('Here is a table of employee roles')
                    db.query(`SELECT * FROM roles`, (err, row) => {
                        console.table(row)
                        firstPrompt()
                    })
                } else {
                    console.log('Here is a table of employees')
                    db.query(`SELECT * FROM employee`, (err, row) => {
                        console.table(row)
                        firstPrompt()
                    })
                }
            })
        }
        //show table based on response


        
        //pick a area to add to
        const addQuestions = (userResponse) => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'addOptions',
                    message: 'What would you like to add to?',
                    choices: ['Departments', 'Roles', 'Employees']
                }
            ]).then ((userResponse)=> {
                if(userResponse.addOptions === "Departments") {
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
                        //console.table(row)
                        firstPrompt()
                }) 
            
            }) 
    }


          //adding a role
          const addRole = (userResponse) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter the name of the role you would like to add.'
                
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for this role? Needs to be a number decimal up to 2'
                // },
                // {
                //     type: 'number',
                //     name: 'roleDepartment',
                //     message: 'Provide deparments number'
                //     // type: 'list',
                //     // name: 'roleDepartment',
                //     // message: 'Pick a department.',
                //     //choices: ['Sales', 'Engineer', 'Finance', 'Legal']
                //     //may need to make this input instead of list due to the ability to add a new deparemnt it won't show up on this list
                // }
            ]).then(roleAddedData => {
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${roleAddedData.roleName}', ${roleAddedData.salary}, ${roleAddedData.roleDepartment});`)
                console.log(`You added a new role named: ${roleAddedData.roleName}, to view your updates, continue through the prompts.`)
                firstPrompt()
            }) 
        }

          //adding a Employee
          const addEmployee = (userResponse) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee you would like to add.'
                
                },
                {
                    type: 'lastName',
                    name: 'lastName',
                    message: 'Enter the last name of the employee you would like to add.'
                },
                {
                    type: 'input',
                    name: 'employeeRole',
                    message: "Enter the employee's role."
                },
                {
                    type: 'input',
                    name: 'employeeManager',
                    message: "Enter the name of the employee's manager."
                }
            ]).then(addedEmployeeData => {
                console.log(`you added a new employee: ${addedEmployeeData.firstName}-- then show the table`)
            }) 
        }

        //updating an employee
        const updateEmployee = (userResponse) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'selectedEmployee',
                    message: 'Pick/Name> an employee to update.'
                    //this may need to be a list of employees or enter a name already listed and state if the name is not listed by returning false-- with a validatio
                },
                {
                    type: 'input',
                    name: 'newRole',
                    message: "What is the employee's new role?"
                //this may be a list to update the role with roles already existing, but if a new role is added it would be on the list!
                }
            ]).then(updatedEmployeeData => {
                console.log(`You updated ${updatedEmployeeData.selectedEmployee}`)
            })
        }

    firstPrompt()


    //write file to the seeds information to update it

    module.exports = firstPrompt