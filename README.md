# SustainabilityTracker 

A basic system to track and display sustainability actions. The frontend is built using Angular, and the backend is built using Node.js and Express.js. Together, they provide a platform for users to mangage and monitor their sustainability efforts.
1. Frontend:
    - List sustainability actions in a table
    - Add new sustainability action
2. Backend:
    - Add and fetch sustainability actions via API
    - JSON file storage for data persistence

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

<br />

## Working Demo Video


https://github.com/user-attachments/assets/c051316c-c929-4308-ad25-df0fd132dd43



## Prerequisits
- [Node.js](https://nodejs.org/) (version 22.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Angular CLI](https://angular.io/cli) (version 17.x or higher)
- [Express.js](https://expressjs.com/) (Backend)

<br />

# Usage
Clone the repository and navigate to repository:
```bash
git clone https://github.com/MinArchie/sustainability-tracker-project.git

cd sustainability-tracker-project
```

## 1. Backend: Quick Start

### a. Installation 
```bash
cd api

npm install
```

```npm install``` should automatically take care of installing any dependencies. 

<b>Core Dependecies:</b>
- ```express.js```
- ```joi``` (validator)
- ```cors``` (for allowing api to be used)
- ```nodemon``` (nodemon, optional for live-reloading).

### b. Running the Server
```bash
node server.js
```
Use ```nodemon server.js``` if nodemon is installed.

Server runs on ```localhost:3000``` by default, unless port is specifed by PATH.

Ensure server is running before attempting to run the website.


## 2. Frontend: Quick Start
### a. Installation

```bash
cd frontend

npm install
```

- All dependencies should be installed. Core Dependency is ```Bootstrap```


### b. Running the Application
```bash
ng serve --open
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

<br />

## Running Unit Tests:
Run the following command to start:
```bash
cd frontend

npm run test
```
The files with ```.specs.ts``` extension hold the default tests

## Running Functional Tests for API Endpoints
Using the <b>Postman Desktop Application</b> or <b>VS Code Extension</b>, follow these steps to vefiy api endpoints:
- Start the backend server 
    ```bash
    cd api

    node server.js
    ```
- Import [test collection](/functional_tests/Sustainability%20Tracker%20API%20Tests.postman_collection.json) (/functional_tests/)into Postman. 
- Run Collection

![PostmanAPI](https://github.com/user-attachments/assets/c9fc561b-72aa-431a-bfb5-b4fa41da4580)


<br />

## Project Structure
### Backend
```
api
├── server.js
├── data.json
├── package.json
```
- ```server.js```: Entry point for the backend application.
- ```data.json```: Stores sustainability actions.

### Frontend
![screenshot](frontend/public/images/Frontend-Strucutre.png)
```arduino
SUSTAINABILITY-TRACKER
├── public
├── src
    ├── app
        ├── actions
        ├── add-actions
        ├── home
        ├── model
        ├── services
        ├── components
            ├── header
            ├── pagination
            ├── success-modal
    ├── index.html
    ├── main.ts
    ├── styles.scss
```
- ```src/app/```: Contains the main application logic and components.
- ```src/app/model```: json data structure
- ```src/app/services```: routing 
- ```public```: assets (svg, images, etc)
