DROP DATABASE IF EXISTS departments_db;

CREATE DATABASE departments_db;

USE departments_db;
select * from employee

CREATE TABLE department (

 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 dept_name VARCHAR(30) unique NOT NULL,
  PRIMARY KEY (id)
 );
 

CREATE TABLE role (

id INTEGER(11) AUTO_INCREMENT NOT NULL,
 title VARCHAR(30),
 salary DECIMAL(10,2) NULL,
   department_id INTEGER(11),
   PRIMARY KEY (id),
   INDEX dep_ind (department_id), 
   CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
   
   );
   
   


   
   
   CREATE TABLE employee (
   
id INT auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTeger(11) ,
  manager_id INTeger(11),
  INDEX role_ind (role_id),  
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,     
  INDEX man_ind (manager_id), 
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
  
  );
  
 select * from role
 
 use departments_db 
 
 insert  into department (dept_name) values ('IT');
  insert  into department (dept_name) value ('Ethics');
   insert  into department (dept_name) value ('Legal');
    insert  into department (dept_name) value ('HR');
    
    use employee_db
    
    insert into department
    
    SELECT * FROM employee
    
    insert into employee (first_name, last_name, role_id, manager_id) values ('Ted', 'Brown', 6, null)
    
    
    SELECT * FROM role
    insert into role (title, salary, department_id) values ("Administrator", 400000, 2);
    
    select * from department
 
 
 
 
 