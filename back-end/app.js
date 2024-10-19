// back-end/app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const userRoutes = require('./routes/userRoutes'); // Importe suas rotas

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost', // ou outro host onde o MySQL está rodando
    user: 'seu_usuario', // seu nome de usuário do MySQL
    password: 'sua_senha', // sua senha do MySQL
    database: 'icare', // nome do banco de dados que você criou
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Rotas
app.use('/api/users', userRoutes(db)); // Passa a conexão do banco de dados para as rotas

// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
