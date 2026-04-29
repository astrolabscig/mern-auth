// api/server.js - Vercel serverless function entry point
// Vercel scans /api and treats each file as a serverless function.
// We re-export the Express app so all routes work under /api/*

export { default } from '../server.js';
