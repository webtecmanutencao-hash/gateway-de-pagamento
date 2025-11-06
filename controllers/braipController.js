// controllers/braipController.js

const BRAIP_SECRET = "66906f52e82893871708630b373c6046fbd4de7a";

export const handleWebhook = async (req, res) => {
  try {
    console.log("📦 Webhook recebido:", req.body);

    const authKey =
      req.body.basic_authentication || req.headers["basic_authentication"];

    if (authKey !== BRAIP_SECRET) {
      console.log("❌ Chave de autenticação inválida:", authKey);
      return res.status(401).json({ error: "Chave de autenticação inválida" });
    }

    const evento = req.body.type || "EVENTO_DESCONHECIDO";
    console.log(`📢 Evento recebido da Braip: ${evento}`);

    res.status(200).json({
      success: true,
      message: "Webhook recebido com sucesso!",
      eventoRecebido: evento,
    });
  } catch (error) {
    console.error("🚨 Erro ao processar webhook:", error);
    res.status(500).json({ error: "Erro interno ao processar webhook" });
  }
};
