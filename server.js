import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs-extra";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const BRAIP_SECRET = process.env.BRAIP_SECRET;
const DB_FILE = "./data/pagamentos.json";

fs.ensureFileSync(DB_FILE);
if (!fs.existsSync(DB_FILE)) fs.writeJSONSync(DB_FILE, []);

app.get("/", (req, res) => {
  res.json({ status: "Servidor Braip ativo e rodando 🚀" });
});

app.post("/api/braip/webhook", async (req, res) => {
  const headerSecret = req.headers["x-braip-secret"];
  if (headerSecret !== BRAIP_SECRET) {
    console.log("❌ Tentativa de acesso com chave inválida!");
    return res.status(401).json({ error: "Chave inválida" });
  }
  const evento = req.body;
  console.log("📩 Evento recebido da Braip:", evento);
  const novoEvento = {
    id: evento.trans_cod || evento.event_id,
    tipo: evento.trans_status_code || "desconhecido",
    cliente: evento.cli_nome || "N/A",
    valor: evento.trans_valor || 0,
    data: new Date().toISOString(),
    eventoCompleto: evento
  };
  const dados = await fs.readJSON(DB_FILE);
  dados.push(novoEvento);
  await fs.writeJSON(DB_FILE, dados, { spaces: 2 });
  console.log("✅ Evento salvo com sucesso!");
  res.status(200).json({ success: true });
});

app.get("/api/pagamentos", async (req, res) => {
  const dados = await fs.readJSON(DB_FILE);
  res.json(dados.reverse());
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});