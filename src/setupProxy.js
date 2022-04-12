
/* eslint-disable import/no-extraneous-dependencies */
const { createProxyMiddleware } = require('http-proxy-middleware');
const { API_URL } = require('./constant');

console.log('API running on: ', API_URL);
module.exports = app => {
  app.use(
    createProxyMiddleware('/socket.io', {
      target: "http://localhost:3001",
      changeOrigin: true,
      ws: true,
      logLevel: 'debug',
      onOpen: () => console.info('proxy socket started')
    }),
  );

  // Add backend API proxy
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      onOpen: () => console.info('proxy api started')
    }),
  );
};
