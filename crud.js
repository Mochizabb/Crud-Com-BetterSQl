import express from "express";
import Database from "better-sqlite3";

const app = express();
app.use(express.json());
const PORT = 3030;

const db = new Database("./database/data.db");

// inserir usuarios no banco
app.post("/", (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Todos os campos devem ser preenchidos!",
      });
    }

    const InsertUsers = db.prepare(`
            INSERT INTO usuarios (name, email, password)
            VALUES (?,?,?)`);
    const result = InsertUsers.run(name, email, password);

    res.status(201).json({
      message: "Usuario criado com sucesso",
      id: result.lastInsertRowid,
      name,
      email,
    });
  } catch (error) {
    res.status(500).json({ error: "Servidor não está respondendo" });

    console.log(error);
  }
});

//visualisar usuarios no banco
app.get("/usuarios", (req, res) => {
  try {
    const users = db.prepare(`
            SELECT id, name, email
            FROM usuarios
            `);
    const usuarios = users.all();

    return res.status(200).json({
      usuarios,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro no banco de dados",
    });
  }
});

//atualizar usuarios no banco
app.put("/usuarios/:id", (req, res) => {
  try {
    const { name, email, password } = req.body;

    //arrays pra editar usuarios dinamicamente
    const updates = [];
    const values = [];

    if (name) {
      updates.push("name = ?");
      values.push(name);
    }
    if (email) {
      updates.push("email = ?");
      values.push(email);
    }
    if (password) {
      updates.push("password = ?");
      values.push(password);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "Nenhum campo para atualizar" });
    }

    const sql = `UPDATE usuarios SET ${updates.join(", ")} WHERE id = ?`; //template string pra editar dinamicamente
    const users = db.prepare(sql); //prepare pra cozinhar
    const result = users.run(...values, req.params.id); //cozinha e desempacota o array em valores

    if (result.changes === 0) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }

    return res.status(200).json({
      message: `Usuario com o id ${req.params.id} foi editado`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao editar usuario!",
    });
  }
});

//deletar usuarios no banco
app.delete("/usuarios/:id", (req, res) => {
  try {
    const users = db.prepare(`
            DELETE FROM usuarios
            WHERE id = ?
            `);
    const result = users.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }

    return res.status(200).json({
      message: `Usuario com o id ${req.params.id} foi apagado`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar usuario!",
    });
  }
});

//deletar o banco
app.delete("/deleteAll", (req, res) => {
  const dropTable = db.prepare(`DROP TABLE IF EXISTS usuarios`);
  dropTable.run();
  return res.status(200).json({ message: "Banco apagado" });
});

//criar banco do 0
app.post("/createAgain", (req, res) => {
  try {
    const dataBase = db.prepare(`
         CREATE TABLE IF NOT EXISTS usuarios(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         email TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL
     )`);
    dataBase.run();

    return res.status(201).json({
      message: "Banco criado",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Erro ao criar o banco",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server Rodando ${PORT}`);
});
