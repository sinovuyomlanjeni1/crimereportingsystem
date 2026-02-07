# Crime Reporting System

## Project Overview
A simple full-stack **Crime Reporting System** built to help South African communities report incidents and track crime reports by area. Users can submit crime reports anonymously or with their details, while an admin can update the status of reported cases.

## Features

* Submit crime incident reports (anonymous or with details)
* Frontend form validation (JavaScript)
* Backend validation using Jakarta Validation
* View all crime reports
* Filter crime reports by area (SQL filtering)
* Admin dashboard to view all reports
* Admin can update report statuses:

  * **Pending**
  * **Under Investigation**
  * **Resolved**
  * **Rejected**

* REST API using Spring Boot
* MySQL database integration
* Simple and clean responsive UI (HTML/CSS/JavaScript)

## Tech Stack

* **Backend:** Java 21, Spring Boot, Spring Data JPA (Hibernate)
* **Frontend:** HTML, CSS, JavaScript
* **Database:** MySQL
* **Build Tool:** Maven
* **Tool:** Intellij IDEA, Git/GitHub


## Project Structure

```
ClinicSystem/
│── src/main/java/com/crimereportingsystem/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── dto/
│   ├── config/
│   └── CrimeReportingSystemApplication.java
│
├── src/main/resources/
│   ├── static/
│   │   ├── index.html
│   │   ├── report.html
│   │   ├── view-reports.html
│   │   ├── admin.html
│   │   ├── css/style.css
│   │   └── js/
│   │       ├── main.js
│   │       ├── report.js
│   │       └── admin.js
│   └── application.properties 
│
│
│── pom.xml
│── README.docx
│── .gitignore
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sinovuyomlanjeni1/crimereportingsystem.git
```

### 2. Configure MySQL Database

```sql
CREATE DATABASE crime_reporting_db;
```

### 3. Open the Project

### 4. Configure application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/crime_reporting_db
spring.datasource.username=root
spring.datasource.password=@Sino2025

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect




### 4. Run the Application

```bash
mvn spring-boot:run
```

Visit in browser: `http://localhost:8080`

## Pages

* Home: http://localhost:8080/index.html
* Report Crime: http://localhost:8080/report.html
* View Reports: http://localhost:8080/view-reports.html
* Admin: http://localhost:8080/admin.html

## Admin Login (Demo)

* Email: admin@crimereport.co.za
* Password: (admin123)

## Screenshots

* Home Page: `screenshots/homepage.png`
* Report Page: `screenshots/reportpage.png`
* View Report Page Page: `screenshots/viewreportpage.png`
* Admin Dashboard : `screenshots/admindashboard.png`

## Future Improvements

* These improvements can be added later to make the project more advanced:
* Real admin authentication using Spring Security + JWT
* Role-based access control (USER / ADMIN)
* Upload crime evidence (images)
* Search reports by crime type or keyword
* Pagination for large number of reports
* Deployment to cloud hosting (Render, Railway, AWS)
* Email notification when report status changes

## What I Learned

* How to build a REST API using Spring Boot
* How to connect Spring Boot with a MySQL database using JPA/Hibernate
* How to perform CRUD operations in a real-world system
* How to validate form inputs using JavaScript and backend validation
* How to filter data using SQL queries in Spring Data JPA
* How to build a simple frontend that communicates with a backend API using Fetch API
* How to structure a full-stack project properly for a portfolio


## Author

Sinovuyo Mlanjeni :
Aspiring Junior Java Developer 

## License

This project is for **educational purposes**.
