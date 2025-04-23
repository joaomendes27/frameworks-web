const express = require('express');
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

const PORT = process.env.PORT || 3000;

// **Aqui você importa as rotas** corretamente
const routes = require('./routes/routes'); // Importando o router do arquivo routes.js

app.use('/api', routes); // Usando as rotas no caminho /api

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

// Conexão com o MongoDB Atlas //Alterar senha
var mongoose = require('mongoose');
var mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (error) => {
  console.log('Error connecting to MongoDB:', error);
});
db.once('connected', () => {
  console.log('Database Connected');
});
