const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api',createProxyMiddleware({target:'http://localhost:3001',changeOrigin: true}));
  app.use('/max7219_scrolling',createProxyMiddleware({target:'http://localhost:3001',changeOrigin: true}));
  app.use('/led_blinking',createProxyMiddleware({target:'http://localhost:3001',changeOrigin: true}));
};