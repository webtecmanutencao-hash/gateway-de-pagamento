import express from "express";
import bodyParser from "body-parser";

const app = express();

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Rota de teste de saúde
app.get("/saude", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Rota de teste manual
app.get("/braip/test", (req, res) => {
  res.json({ message: "Rota de teste da Braip funcionando!" });
});

// Rota de webhook Braip
app.post("/braip/webhook", (req, res) => {
  console.log("🔔 Webhook recebido da Braip:", req.body);

  // Resposta obrigatória para a Braip entender que deu certo
  res.json({ message: "Webhook recebido com sucesso!" });
});

// Configuração da porta
const port = process.env.PORT || 10000;

// Escutar em 0.0.0.0 para Render funcionar corretamente
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
