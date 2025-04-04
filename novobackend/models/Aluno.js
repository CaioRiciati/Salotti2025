const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  saldo: { type: Number, default: 100 }, // Exemplo: saldo inicial
  password: { type: String, required: true },
});

module.exports = mongoose.model("Aluno", alunoSchema);
