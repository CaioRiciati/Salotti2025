const express = require("express");
const Produto = require("../models/Produto");
const Aluno = require("../models/Aluno");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Listar todos os produtos
router.get("/", async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
});

// Comprar produto (autenticado)
router.post("/comprar/:id", protect, async (req, res) => {
  const { id } = req.params;
  const alunoId = req.aluno.id;

  try {
    const produto = await Produto.findById(id);
    const aluno = await Aluno.findById(alunoId);

    if (!produto || produto.quantidade <= 0) {
      return res.status(400).json({ message: "Produto fora de estoque" });
    }

    if (aluno.saldo < produto.price) {
      return res.status(400).json({ message: "Saldo insuficiente" });
    }

    // Atualizar saldo do aluno e quantidade do produto
    aluno.saldo -= produto.price;
    produto.quantidade -= req.body.quantidade;

    await aluno.save();
    await produto.save();

    res.json({ message: "Compra realizada com sucesso", saldo: aluno.saldo });
  } catch (error) {

    res.status(500).json({ message: "Erro interno" });
  }
});

module.exports = router;
