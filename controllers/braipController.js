// controllers/braipController.js

const BRAIP_SECRET = "66906f52e82893871708630b373c6046fbd4de7a";

// Simulação de banco de dados em memória
let clientes = [];

/**
 * Recebe o webhook da Braip
 */
export const handleWebhook = async (req, res) => {
  try {
    const evento = req.body.type || "DESCONHECIDO";
    const clienteEmail = req.body.email_cliente || req.body.email || "sem-email";

    console.log(`📦 Webhook recebido da Braip: ${evento} (${clienteEmail})`);

    // Verifica autenticação da Braip
    const authKey = req.body.basic_authentication || req.headers["basic_authentication"];
    if (authKey !== BRAIP_SECRET) {
      return res.status(401).json({ error: "Chave de autenticação inválida" });
    }

    // Busca ou cria o cliente no "banco" em memória
    let cliente = clientes.find(c => c.email === clienteEmail);
    if (!cliente) {
      cliente = { email: clienteEmail, status: "novo", data: new Date().toISOString() };
      clientes.push(cliente);
    }

    // Atualiza o status do cliente conforme o evento recebido
    switch (evento) {
      case "VENDA_APROVADA":
      case "ASSINATURA_ATIVA":
        cliente.status = "ativo";
        break;

      case "VENDA_CANCELADA":
      case "ASSINATURA_CANCELADA":
      case "REEMBOLSO":
      case "CHARGEBACK":
        cliente.status = "bloqueado";
        break;

      default:
        cliente.status = "pendente";
        break;
    }

    console.log("📊 Lista atual de clientes:", clientes);

    res.status(200).json({
      message: "Webhook recebido com sucesso!",
      cliente
    });
  } catch (error) {
    console.error("🚨 Erro ao processar webhook:", error);
    res.status(500).json({ error: "Erro interno ao processar webhook" });
  }
};

/**
 * Lista todos os clientes cadastrados (para o frontend consultar)
 */
export const listarClientes = (req, res) => {
  res.json(clientes);
};
