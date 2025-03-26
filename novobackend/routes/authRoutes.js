const express = require("express");
const jwt = require("jsonwebtoken");
const Aluno = require("../models/Aluno");

const router = express.Router();

// Login do aluno
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body)

  try {
    const aluno = await Aluno.findOne({ email });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }
    
    const senhaValida = aluno.password === password;
    console.log(senhaValida)
    console.log('Senha válida:', senhaValida);
    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: aluno._id, name: aluno.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, saldo: aluno.saldo });
  } catch (error) {
    res.status(500).json({ message: "Erro interno" });
  }
});

module.exports = router;
