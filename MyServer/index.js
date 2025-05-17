const express = require('express');
const app = express();
const port = 3000;

// Basic Route
app.get('/', (req, res) => {
   res.send('Welcome to the REST API!');
});

// Start the server
app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});

// Some data to work with
let assignments = require('data.json');
 
 // Get All Assignments
 app.get('/api/assignments', (req, res) => {
    res.json(assignments);
 });
 
 // Get a Single Assignment by ID
 app.get('/api/assignments/:id', (req, res) => {
    const assignment = assignments.find(a => a.id === parseInt(req.params.id));
    if (!assignment) return res.status(404).send('Assignment not found');
    res.json(assignment);
 });

 app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
 });
 
 // Handle 404 Errors
 app.use((req, res) => {
    res.status(404).send('Route not found');
 });
 