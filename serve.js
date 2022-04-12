require('dotenv').config();
// Get dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const http = require('http');
// const { API_URL } = require('./src/constant');

const app = express();


const API_URL = process.env.REACT_APP_TARGET_ENV === 'development' ?
            `${process.env.REACT_APP_API_URL_ENV}` :
            `${process.env.REACT_APP_API_URL}`;
app.use(express.static(path.join(__dirname, 'build')));
app.use(
  createProxyMiddleware('/socket', {
    target: API_URL,
    changeOrigin: true,
    ws: true,
  }),
);

// add proxy redirect to backend api
app.use(
  '/api',
  createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
  }),
);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
