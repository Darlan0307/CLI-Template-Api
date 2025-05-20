<!-- ![Logo do projeto](https://i.imgur.com/kniMQHu.png) -->

# 🚀 Api Boilerplate

## 🔥 Introdução

Esse projeto é uma CLI para gerar rapidamente boilerplate de APIs em Node.js,com configurações prontas de lint,typeScript, testes, docker e etc. [Página no NPM.](https://www.npmjs.com/package/@darlan0307/api-boilerplate)
Frameworks que você pode escolher para o projeto:

- [Express](https://expressjs.com/)
- [Fastify](https://fastify.dev/)
- [HonoJS](https://hono.dev/)

### 📥 Exemplo de Uso

```bash
npx @darlan0307/api-boilerplate <nome-do-projeto>
```

ou, após instalar globalmente:

```bash
npm install -g @darlan0307/api-boilerplate
api-boilerplate <nome-do-projeto>
```

### ✨ Flags

- **-f, --force**: Sobrescrever diretório se já existir.

- **--lint**: Configurar o [eslint](https://eslint.org/) e o [prettier](https://prettier.io/) automaticamente.

- **-t, --tests**: Preparar o ambiente para os testes unitários. Até o momento a CLI pode configurar o ambiente para testes com o [vitest](https://vitest.dev/), [jest](https://jestjs.io/pt-BR/) e o [test runner](https://nodejs.org/api/test.html#test-runner) (nativo do nodejs)

- **-r, --root**: Criar template na raiz do projeto, se não for informado o template da api será criado dentro de uma pasta com o nome do projeto.

### 🏛️ Arquitetura

```
├── src
│   ├── @types
│   ├── app
│   ├── infra
|   |   ├── errors
|   |   ├── middlewares
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

- **main.ts**: É o ponto de entrada da aplicação, onde as configurações são carregadas, as classes são instanciadas e a API é iniciada.
- **infra**: Agrupa recursos essenciais ao funcionamento do sistema, mas que não fazem parte do domínio de negócios.
- **shared**: Reúne classes e funções genéricas, independentes de qualquer modelo específico, que podem ser reutilizadas em diversos pontos da aplicação
- **@types**: Tipagens globais adicionais de bibliotecas/frameworks como o express, fastify e etc.

## 📦 Tecnologia usada:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 📄 Licença

Esse projeto está sob a licença (MIT) - acesse os detalhes [aqui](https://choosealicense.com/licenses/mit/).

## 👷 Autor

- **Darlan Martins** - [LinkedIn](https://www.linkedin.com/in/darlan-martins-8a7956259/)
