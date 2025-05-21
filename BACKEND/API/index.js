const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);


// Configuração do COR
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, id-token");
  next();
});

app.use(express.json());

// Porta
const PORT = process.env.PORT || 3000;

// Importação de rotas
const routes = require('./routes/routes');
app.use('/api', routes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

// Conexão com o MongoDB Atlas (coloque sua URL correta abaixo)
var mongoURL = "mongodb+srv://joao246296:familia123@tarefasdb.tpfm1.mongodb.net/tarefasDB?retryWrites=true&w=majority&appName=tarefasDB";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('Error connecting to MongoDB:', error);
});

db.once('connected', () => {
  console.log('Database Connected');
});
