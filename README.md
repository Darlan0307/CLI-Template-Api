![Logo do projeto](https://i.imgur.com/kniMQHu.png)

# 🚀 Api Boilerplate

## 🔥 Introdução

Esse projeto é uma CLI para gerar rapidamente boilerplate de APIs em Node.js, Express e TypeScript com configurações prontas de lint, testes, docker, cache e etc.

> OBS: Ainda está em desenvolvimento

## ✨ Funcionalidades Principais

## 📥 Instalação

## ⚙️ Exemplo de Uso

### 🏛️ Arquitetura

```
├── src
│   ├── @types
│   │   └── express
│   ├── app
│   ├── infra
│   │   └── logger.ts
│   ├── shared
│   ├── http-server.ts
│   └── main.ts
├── .env
├── .env.example
├── .gitignore
├── app.log
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

- **@types**: Tipagens globais adicionais de bibliotecas como o express.
- **main.ts**: É o ponto de entrada da aplicação, onde as configurações são carregadas, as classes são instanciadas e a API é iniciada.
- **infra**: Agrupa recursos essenciais ao funcionamento do sistema, mas que não fazem parte do domínio de negócios.
- **shared**: Reúne classes e funções genéricas, independentes de qualquer modelo específico, que podem ser reutilizadas em diversos pontos da aplicação

## 📦 Tecnologia usada:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 👷 Autor

- **Darlan Martins** - [LinkedIn](https://www.linkedin.com/in/darlan-martins-8a7956259/)
