# SustainabilityTracker 

This tracker is a basic system to track and display sustainability actions. This project consists of two parts: the frontend and the backend. The frontend is built using Angular, and the backend is built using Node.js and Express.js. Together, they provide a platform for users to mangage and monitor their sustainability efforts.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.



## Working Demo Video
[Demo Video](https://drive.google.com/file/d/1jcnP34lMdCBkG9Y0A3ZF9NTkgCvFNVM8/view?usp=sharing) contains a run through of the website's basic features and layout.

## Features
### Frontend
- List sustainability actions in a table
- Add new sustainability action
- User-friendly interface
### Backend
- Add and fetch sustainability actions via API
- JSON file storage for data persistence

## Prerequisits
- [Node.js](https://nodejs.org/) (version 22.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Angular CLI](https://angular.io/cli) (version 17.x or higher)
- [Express.js](https://expressjs.com/) (Backend)

## Clone Repository
Clone the repository and navigate to repository:
```bash
git clone https://github.com/MinArchie/sustainability-tracker-project.git
cd sustainability-tracker-project
```

## Backend: Getting Started

### Installation 
Navigate to the backend folder:
```bash
cd sustainability-tracker-api
```

Install Backend Dependencies.
```bash
npm install
```

```package.json``` contains list of dependencies.
```npm install``` should automatically take care of installing any dependencies. But if faced with any issues of missing packages, can still follow these commands to install:

- install express js
    ```bash
    npm install express
    ```

- install joi (validator)
    ```bash
    npm install joi
    ```

- install cors (for allowing api to be used)
    ```bash
    npm install cors
    ```

- install nodemon (node monitor) [optional for live-reloading] 
    ```bash
    npm install nodemon
    ```

### Running the Server
1. Start the server
    ```bash
    nodemon index.js
    ```
    Use ```node index.js``` if nodemon is not installed.
   
    Server runs on ```localhost:3000``` by default, unless port is specifed by PATH.

    Ensure server is running before attempting to run the website.

### API Endpoints
- ```GET:``` ```/api/actions```: Fetch all sustainability actions
- ```POST:``` ```/api/actions```: Add a new sustainability action
- Request body:
    ```json
    {
        "id": 1,
        "action": "Carpooling",
        "date": "2024-08-12",
        "points": 20
    }
    ```


## Frontend: Getting Started
1. Navigate to Frontend Folder
    ```bash
    cd frontend
    ```
2. Install Dependencies.
    ```bash
    npm install
    ```
    - All dependencies should be installed. If faced with any missing dependencies for bootstrap, can follow this to install bootstrap
        ```bash
        npm i bootstrap@5.3.3
        ```


### Running the Application
```bash
ng serve --open
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Project Structure
### Backend
```
sustainability-tracker-api
├── index.js
├── data.json
├── package.json
```
- ```index.js```: Entry point for the backend application.
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
