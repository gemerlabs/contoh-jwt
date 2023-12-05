const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./models");
const authMiddleware = require("./middlewares/auth.middleware");
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(200).json({
      message: "Username atau password tidak boleh kosong!",
    });
  }

  const user = await db.users.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(200).json({
      message: "Username atau password salah!",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(200).json({
      message: "Username atau password salah!",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      full_name: user.fullName,
      username: user.username,
    },
    "c62cf112a122157cfe55d492f5a12296b9c90065",
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).json({
    message: "Berhasil Login",
    token,
  });
});

app.get("/public", (req, res, next) => {
  return res.status(200).json({
    message: "Ini adalah endpoint untuk PUBLIC, semua orang bisa mengakses ini",
  });
});

app.get("/private", authMiddleware, (req, res, next) => {
  return res.status(200).json({
    message:
      "Ini adalah endpoint PRIVATE, hanya orang yang beriman saja yang bisa membuka!",
  });
});

app.listen(3001, () => {
  console.clear();
  console.log("Server starting on port http://localhost:3001");
});
