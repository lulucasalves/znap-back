
# Projeto Znap Backend

Este é um teste para desenvolvedor pleno na empresa Znap, serão passadas as instruções para inicialização do servidor.

A versão em que foi desenvolvida o projeto foi com  Node: `v20.6.1` e NPM `v9.8.1` é recomendavel utilizar estas versões para iniciar o servidor.

Este servidor funciona em conjunto com a aplicação [frontend](https://github.com/lulucasalves/znap-front)

### Clonando projeto
```bash
    git clone git@github.com:lulucasalves/znap-back.git
```

### Configurando variaveis de ambiente
As variáveis de ambiente serão necessárias para indicar a conexão com o banco de dados e definir se o servidor é de desenvolvimento ou não, sendo assim ao iniciar o servidor de desenvolvimento ele irá sincronizar todas suas configurações com o banco de dados.
Renomeie os dados da .env.example para .env e altere as variaveis conforme o necessário.

### Instalando dependências
```bash
    npm install
```
```bash
    yarn
```

### Iniciando projeto
```bash
    npm run dev
```
```bash
    yarn dev
```

### Utilizando o docker
É possível iniciar o projeto usando o `Docker` ou o `Docker Compose`

#### Docker
```bash
    docker build -t znap-back .

    # servidor em primeiro plano
    docker run -p 8080:8080 znap-back

    # servidor em segundo plano
    docker run -d -p 8080:8080 znap-back
```

#### Docker Compose
```bash
    # servidor em primeiro plano
    docker-compose up

    # servidor em segundo plano
    docker-compose up -d
```

### Realizando testes
Para realizar os testes tenho certeza que a porta 8080 não esteja em uso pois os testes são via http e não influenciam na aplicação original
```bash
    npm run test
```
```bash
    yarn test
```