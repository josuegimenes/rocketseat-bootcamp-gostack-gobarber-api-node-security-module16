<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/josuegimenes/rocketseat-bootcamp-gostack-gobarber-api-node-security-module16?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

# Módulo 16: Aplicação Backend – GoBarber (Segurança no Node.js)

Sistema de barbearia para agendamento de serviços.

### 1º Passo: Instalar Express Brute

Um middleware de proteção de força bruta para rotas expressas que limita a taxa de solicitações recebidas, aumentando o atraso a cada solicitação em uma sequência semelhante a fibonacci.

```
yarn add express-brute
```

### 2º Passo: Instalar Express Brute Redis

Usado para guardar o número de tentativas que um determinado ip de usuário tentou fazer na rota de autenticação, por exemplo.

```
yarn add express-brute-redis
```

### 3º Passo: Instalar Helmet

É um middleware do Express que basicamente adiciona vários tipos de configurações nos Headers da nossa resposta para habilitar alguns tipos de proteção de forma automática.

```
yarn add helmet
```
