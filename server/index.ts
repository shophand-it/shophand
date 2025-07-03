import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import partsRoutes from './parts.route';
import authRoutes, { setupAuth } from './auth.route';
import vendorsRoutes from './payment.route';
import ordersRoutes from './orders.route';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

// Setup authentication
setupAuth(app);

// Routes
app.use('/api/parts', partsRoutes);
app.use('/api/vendors', vendorsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/auth', authRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (_, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🛠️ Server running on http://localhost:${PORT}`);
});