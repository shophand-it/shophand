import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import partsRoutes from './routes/parts.route';
import { setupAuth } from './routes/auth.route';
import authRoutes from './routes/auth.route';
import vendorsRoutes from './routes/payment.route';
import ordersRoutes from './routes/orders.Routes';

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

app.use(cors());
app.use(express.json());

// Setup authentication middleware
setupAuth(app);

// Routes
app.use('/api/parts', partsRoutes);
app.use('/api/vendors', vendorsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/auth', authRoutes);

// Serve frontend static build
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (_, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🛠️ Server running on http://localhost:${PORT}`);
});