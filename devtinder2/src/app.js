// server.js
/*
GET http://localhost:3000/ → Welcome message

GET http://localhost:3000/users → List users

GET http://localhost:3000/users/1 → Single user

POST http://localhost:3000/users → Create user (send JSON body)

PUT http://localhost:3000/users/1 → Update user (send JSON body)

DELETE http://localhost:3000/users/1 → Delete user
*/

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON body

// Route 1: Home
app.get('/', (req, res) => {
  res.send('Welcome to Express Server!');
});

// Route 2: Get all users
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

// Route 3: Get single user by ID
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'John Doe' });
});

// Route 4: Create a user
app.post('/users', (req, res) => {
  res.json({ message: 'User created successfully', data: req.body });
});

// Route 5: Update a user
app.put('/users/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} updated`, data: req.body });
});

// Route 6: Delete a user
app.delete('/users/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
