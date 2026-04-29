// localServer.js - local development ONLY
// Run: npm run dev
// Vercel ignores this file; vercel.json routes to api/server.js instead

import 'dotenv/config'; // Load .env for local development
import app from './server.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Local dev server running on http://localhost:' + PORT);
});
