const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantidade: { type: Number, required: true }, // Estoque do produto
});

module.exports = mongoose.model("Produto", produtoSchema);
