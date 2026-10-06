import app from './app.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv"
import { env } from './config/env.js';
dotenv.config()
await connectDB();
app.listen(env.port, '0.0.0.0', () => {
  console.log(`BaaS API listening on port ${env.port}`);
});
