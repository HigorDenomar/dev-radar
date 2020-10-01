const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

// criando a conexão com o banco
mongoose.connect('mongodb+srv://higordenomar:higordenomar@cluster0.btf32.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

// utilizando as rotas do arquivo ./routes.js
app.use(routes);

server.listen(3333);
