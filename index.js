// index.js

// Importa o módulo Restify
const restify = require("restify");

// Cria o servidor Restify
const server = restify.createServer({
  name: "MeuServidor",
  version: "1.0.0",
});

// Configuração para permitir que o servidor entenda requisições JSON
server.use(restify.plugins.bodyParser());

// Rota de exemplo
server.get("/api/exemplo", (req, res, next) => {
  res.send({ mensagem: "Bem-vindo à minha API!" });
  return next();
});

// Inicia o servidor na porta 3000
server.listen(3000, () => {
  console.log("%s está ouvindo na porta %s", server.name, server.url);
});
