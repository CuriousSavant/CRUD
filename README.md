# CRUD App

This is a basic CRUD application built with React, TypeScript, Tailwind CSS, Node.js, and MySQL. It allows you to manage employees with functionalities for adding, updating, deleting, and viewing employee information.

## Features

- **Add Employees**: Add new employees with their details.
- **Edit Employees**: Update existing employee information.
- **Delete Employees**: Remove employees from the database.
- **View Employees**: Display a list of all employees with their details.

## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MySQL

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CuriousSavant/CRUD.git
   cd CRUD
   ```

2. **Install dependencies for the client**:
   ```bash
   cd client
   npm i
   ```

3. **Install dependencies for the server**:
   ```bash
   cd server
   npm i
   ```

4. **Setup the backend**:
   - Ensure MySQL is installed and running.
   - Create a database named `employees` in MySQL.
   - Configure the `.env` file in the backend with your MySQL credentials.

5. **Run the project**:
   ```bash
   # In client directory
   cd client
   npm run dev

   # In server directory
   cd ../server
   npm start
   ```

6. **Open the application**:
   Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.
`;
