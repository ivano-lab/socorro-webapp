const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); 
require('dotenv').config();


const app = express();
const port = 3000;

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para receber os dados do formulário
app.post('/rescue', (req, res) => {
    const {
        latitude,
        longitude,
        adults_count,
        children_count,
        elderly_count,
        animals_count,
        special_needs,
        additional_info
    } = req.body;

    const sql = `INSERT INTO rescue_requests (latitude, longitude, adults_count, children_count, elderly_count, animals_count, special_needs, additional_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [latitude, longitude, adults_count, children_count, elderly_count, animals_count, special_needs, additional_info], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados: ', err);
            res.status(500).send('Erro ao salvar dados no banco de dados');
            return;
        }
        res.status(200).send('Dados salvos com sucesso');
    });
});

app.get('/rescues', (req, res) => {
  const sql = 'SELECT * FROM rescue_requests';
  db.query(sql, (err, results) => {
      if (err) {
          console.error('Erro ao buscar dados: ', err);
          res.status(500).send('Erro ao buscar dados no banco de dados');
          return;
      }
      res.status(200).json(results);
  });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
