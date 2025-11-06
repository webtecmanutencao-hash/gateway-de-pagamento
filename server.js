import express from "express";
import bodyParser from "body-parser";
import clientesRoutes from "./routes/clientesRoutes.js";
import { handleWebhook } from "./controllers/braipController.js";

const app = express();
app.use(bodyParser.json());

// Rota de saúde (teste rápido)
app.get("/saude", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Rota para listar clientes
app.use("/clientes", clientesRoutes);

// Teste manual
app.get("/braip/test", (req, res) => {
  res.json({ message: "Rota de teste da Braip funcionando!" });
});

// Webhook Braip
app.post("/braip/webhook", handleWebhook);

// Porta configurada para Render
const port = process.env.PORT || 10000;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
