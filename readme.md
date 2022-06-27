# Blood Bank Management System

### this is api for bloodbank management system using NodeJs- express - nodemailer - express validator - sequelize .

---

## Installation

### <strong>Prepare your database using `mysql ` server</strong>

- `create user 'username'@'hostname' identified by 'userpassword';`

- `create database bloodbank;`

- `grant all privileges on bloodbank.* to 'username'@'hostname';`

* install dependencies `npm i ` or `npm install`

* make `.env` file like `.env-example` with your own Data

* to build project `npm run build`

* to append all hospitals of system go to hospital controller and uncomment `migrateHospitals()` for the first time to migrate all Hospitals.

* to run project `npm start`

* automatically it will migrate all migration files
