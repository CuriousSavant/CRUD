const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "", // Your MySQL host
    user: "", // Your MySQL username
    password: "", // Your MySQL password
    database: "" // Your MySQL database name
});

db.connect((err) => {
    if (err) {
        console.error("Failed to connect to MySQL", err);
    } else {
        console.log("Connected to MySQL successfully!");
    }
});

app.get('/employees', (req, res) => {
    const getAllEmployeesQuery = "SELECT * FROM employees";
    db.query(getAllEmployeesQuery, (err, result) => {
        if (err) {
            console.error("Error fetching employees:", err);
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/employees', (req, res) => {
    const { first_name, last_name, salary, email, title } = req.body;
    const createEmployeeQuery = "INSERT INTO employees(first_name, last_name, salary, email, title) VALUES(?, ?, ?, ?, ?)";
    db.query(createEmployeeQuery, [first_name, last_name, salary, email, title], (err, result) => {
        if (err) {
            console.error("Error creating employee:", err);
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, salary, email, title } = req.body;
    const updateEmployeeQuery = "UPDATE employees SET first_name = ?, last_name = ?, salary = ?, email = ?, title = ? WHERE id = ?";
    db.query(updateEmployeeQuery, [first_name, last_name, salary, email, title, id], (err, result) => {
        if (err) {
            console.error("Error updating employee:", err);
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const deleteEmployeeQuery = "DELETE FROM employees WHERE id = ?";
    db.query(deleteEmployeeQuery, [id], (err, result) => {
        if (err) {
            console.error("Error deleting employee:", err);
            res.status(500).send(err);
        } else {
            res.json(result);
            console.log("Employee deleted successfully");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});
