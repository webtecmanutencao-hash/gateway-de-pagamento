import express from "express";
import { listarClientes } from "../controllers/braipController.js";

const router = express.Router();

// Endpoint para listar clientes
router.get("/", listarClientes);

// ✅ exportação default (ESSENCIAL)
export default router;
