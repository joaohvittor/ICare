// back-end/routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Rota para cadastrar usuários
module.exports = (db) => {
    router.post('/register', (req, res) => {
        const { nome, email, senha } = req.body;

        // Validação simples
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Query para inserir usuário no banco de dados
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        db.query(query, [nome, email, senha], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
            }
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: results.insertId });
        });
    });

    // Rota para obter todos os usuários
    router.get('/', (req, res) => {
        db.query('SELECT * FROM usuarios', (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao obter usuários', error });
            }
            res.json(results);
        });
    });

    return router;
};
