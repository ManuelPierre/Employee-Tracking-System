var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "EthanBig#2020",
  database: "departments_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // connection.end();
  runSearch();
  //UpdateRole()
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "View All Employees by Department",
        "View Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Add Role",
        "Add Department",
        "I am finished",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewAll();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "View All Employees by Department":
          viewAllEmployeesByDepartment();
          break;

        case "View Employees by Manager":
          viewAllByManager();
          break;

        case "Add Employee":
          AddEmployee();
          break;

        case "Remove Employee":
          RemoveEmployee();
          break;

        case "Update Employee Role":
          UpdateRole();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "I am finished":
          break;
      }
    });
}

function viewAll() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();

  });
  

}
// viewAll();

function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
 

}
// viewAll();

function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
  

}
// viewAll();

function viewAllEmployeesByDepartment() {
  connection.query(
    "SELECT first_name, last_name, role_id, manager_id, dept_name FROM employee LEFT JOIN department ON dept_name = dept_name;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    }

  );
  
}

// viewAllEmployeesByDepartment();

function viewAllByManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee GROUP BY manager_id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    }
  );
 
}

// viewAllByManager();

function AddEmployee() {
  connection.query("Select * From employee", function (err, res) {
    if (err) throw err;
    // console.log(res);

    const managerNames = res.map((employee) => {
      return {
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
      };
    });

    console.log("here");
    console.table(managerNames);

    inquirer
      .prompt([{
          name: "f_name",
          type: "input",
          message: "What is the first name of the employee you would like to add?",
        },

        {
          name: "l_name",
          type: "input",
          message: "What is the last name of the employee you would like to add?",
        },

        {
          name: "manager_id",
          type: "list",
          message: "Please select the manager for this employee",
          choices: managerNames,
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO employee SET ?", {
            first_name: answer.f_name,
            last_name: answer.l_name,
            manager_id: answer.manager_id,
            role_id: 1,
          },
          function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
          }
        );
      });
  });
}

// AddEmployee();

function RemoveEmployee() {
  connection.query("Select * From employee", function (err, res) {
    if (err) throw err;
    // console.log(res);

    const deleteNames = res.map((employee) => {
      return {
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
      };
    });

    console.log("here");
    console.table(deleteNames);

    inquirer
      .prompt([{
        name: "employee",
        type: "list",
        message: "Who is the employee you like to delete?",
        choices: deleteNames,
      }, ])
      .then(function (answer) {
        connection.query(
          "Delete from employee where ?", {
            id: answer.employee,
          },
          function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
          }
        );
      });
  });
  
}

function UpdateRole() {
  connection.query("Select * From employee", function (err, res) {
    if (err) throw err;
    //console.log(res);

    const updateNames = res.map((employee) => {
      return {
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
      };
    });

    connection.query("Select * From role", function (err, res) {
      if (err) throw err;
      //console.log(res);

      const updateRoles = res.map((role) => {
        return {
          value: role.id,
          name: `${role.title} ${role.id}`,
        };
      });

      inquirer
        .prompt([{
            name: "employee",
            type: "list",
            message: "Who is the employee you like to update?",
            choices: updateNames,
          },
          {
            name: "role",
            type: "list",
            message: "What role would you like to update employee to?",
            choices: updateRoles,
          },
        ])
        .then(function (answer) {
          console.log(answer);
          connection.query("UPDATE `employee` SET ? WHERE ?", [{
              role_id: answer.role,
            },
            {
              id: answer.employee,
            }],

            function (err, res) {

              if (err) console.log(err);
              console.table(res);
              runSearch();
              
            },
          );
        });
    });
  });
 
}


function addRole() {
  connection.query("Select * from department", function (err, res) {
    if (err) throw err;
    //console.log(res);

    const departmentNames = res.map((department) => {
      return {
        value: department.id,
        name: `${department.dept_name}`,
      };
    });

    inquirer
      .prompt([{
          name: "title",
          type: "input",
          message: "What is the title you would like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the individual you would like to add?",
        },
        {
          name: "department",
          type: "list",
          message: "What is the department this person is entering?",
          choices: departmentNames,
        },
      ])

      .then(function (answer) {
        connection.query(
          "INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department,
          },
          function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
          }
        );
      });
  });

}

function addDepartment() {

  inquirer.prompt([{
      name: "department",
      type: "input",
      message: "What is the name of the new department you want to create?"
    }])

    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?", {

          dept_name: answer.department,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
    });


}