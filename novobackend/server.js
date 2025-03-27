const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const produtoRoutes = require("./routes/produtoRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/produtos", produtoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado!");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Servidor rodando na porta 5000");
    });
  })
  .catch((err) => console.error(err));
