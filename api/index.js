// api/index.js

// 1. Import the application instance exported from server.js
// Note: '../server.js' points up one directory to find server.js
import app from '../server.js'; 

// 2. Export the application instance as the Vercel handler
export default app;