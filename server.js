// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import braipRoutes from "./routes/braipRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧰 Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Rota de saúde
app.get("/saude", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Rota principal Braip
app.use("/braip", braipRoutes);

// 🧠 Captura qualquer rota inexistente (erro 404)
app.use((req, res) => {
  res.status(404).json({ error: `Rota não encontrada: ${req.originalUrl}` });
});

// 🚀 Porta dinâmica do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
