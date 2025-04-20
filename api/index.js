// Simple Express server for Vercel
const express = require('express');
const path = require('path');

// Create Express app
const app = express();

// Serve static files
app.use(express.static(path.join(process.cwd(), 'dist')));

// API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Export the Express app for serverless environments
module.exports = app;
