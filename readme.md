create user 'citc'@'localhost' identified by 'citcpassword';
create database bloodbank;
grant all privileges on bloodbank.* to 'citc'@'localhost';