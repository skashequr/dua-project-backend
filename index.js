const express = require('express');
const cors = require("cors");
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000"
    ],
    credentials: true,
}));

// JSON body parser middleware
app.use(express.json());

const dbPath = path.resolve(process.cwd(), 'public/dua_main.sqlite'); // Define your SQLite database path

// Function to connect to the database
async function connectDB() {
    try {
        // Open the SQLite database connection
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        console.log('Connected to the SQLite database.');
        return db; // Return the database connection
    } catch (error) {
        console.error('Error connecting to SQLite database:', error.message);
        throw error; // Throw the error for proper handling
    }
}

// Task post request
app.post("/tasks", async (req, res) => {
    try {
        // Implement your logic to handle task creation
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Get tasks
app.get("/api/subcategories", async (req, res) => {
    try {
        const db = await connectDB(); // Connect to the database
        const { cat_id } = req.query;
        const categories = await db.all('SELECT * FROM sub_category WHERE cat_id = ?', cat_id);
        return res.send({ categories });
    } catch (error) {
        console.error('Error retrieving tasks:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
app.get("/api/duas", async (req, res) => {
    try {
        const db = await connectDB(); // Connect to the database
        const { cat_id } = req.query;
        const categories = await db.all('SELECT * FROM dua WHERE cat_id = ?', cat_id);
        return res.send({ categories });
    } catch (error) {
        console.error('Error retrieving tasks:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
app.get("/", (req, res) => {
    res.send("Dua project");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
