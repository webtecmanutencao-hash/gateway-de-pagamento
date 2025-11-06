// routes/braipRoutes.js
import express from 'express';
import { handleWebhook } from '../controllers/braipController.js'; // note o .js no final

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ ok: true, route: '/braip/test' });
});

router.post('/webhook', handleWebhook);

export default router; // <- isso é crucial
