// Dependencies
let inquirer = require("inquirer");
let mysql = require("mysql");

// create the connection information for the sql database
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "what would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "EXIT"]
        }
    ])
        .then(function (answer) {

            // based on their answer call the function
            if (answer.action === "Add Employee") {
                addEmployee();
            }
            else if (answer.action === "View All Employees") {
                viewEmployees();
            }
            else if (answer.action === "Update Employee Role") {
                updateRole();
            }
            else {
                connection.end();
            }
        })
}

// add employee
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "what is the employee's first name?",
        },
        {
            name: "lastName",
            type: "input",
            message: "what is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "what is the employee's role?",
            choices: ["Sales Lead", "Software Engineer"]
        },
        {
            name: "roleid",
            type: "input",
            message: "what is their role id?"
        },

        {
            name: 'department',
            type: "list",
            message: "what department is the employee part of?",
            choices: ["Sales", "Engineering",]
        },
        {
            name: "manager",
            type: "list",
            message: "who is the employee's Manager?",
            choices: ["Derek Boone", "Rosemary Petty"]
        }
    ])
        .then(function (answer) {
            // when finished prompting, insert a new employee into the db with that info
            console.log("Adding a new employee...\n")
            let query = connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: parseInt(answer.roleid)
                },
                function (err) {
                    if (err) throw err;
                    // console.log("employee was added sucessfully!")
                    // start();
                }
            );
            console.log(query.sql);

            // insert role into the db with that info 
            let query2 = connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.role
                },
                function (err) {
                    if (err) throw err;
                }
            )
            console.log(query2.sql);
            console.log("employee was added sucessfully!")

            start();

        });

}

function updateRole() {

    inquirer.prompt([
        {
            name:"whichEmployee",
            type: "list",
            message: "which employee's role do you want to update?",
            choices: "#"
        }
    ])
}

function viewEmployees() {
    connection.query("SELECT first_name, last_name, title FROM employee INNER JOIN role ON employee.id = role.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })

}
