![Logo do projeto](./banner.png)

# 🚀 Api Boilerplate

> You can also read in **[English](./README-en.md)** 🇺🇸

## 📋 Introdução

Uma ferramenta de linha de comando (CLI) que acelera o desenvolvimento de APIs em Node.js, gerando templates pré-configurados com as melhores práticas. Inclui configurações prontas para linting, TypeScript, testes e arquitetura bem estruturada.

**📦 [Disponível no NPM](https://www.npmjs.com/package/@darlan0307/api-boilerplate)**

### 🛠️ Frameworks Suportados

Escolha entre os principais frameworks do ecossistema Node.js:

- **[Express](https://expressjs.com/)**
- **[Fastify](https://fastify.dev/)**
- **[HonoJS](https://hono.dev/)**

### 🚀 Instalação e Uso

###### Uso Direto (Recomendado)

```bash
npx @darlan0307/api-boilerplate <nome-do-projeto>
```

###### Instalação Global

```bash
npm install -g @darlan0307/api-boilerplate
api-boilerplate <nome-do-projeto>
```

###### Demonstração

[![Assista ao vídeo](https://img.youtube.com/vi/RRv9dDtHyng/3.jpg)](https://www.youtube.com/watch?v=RRv9dDtHyng)

### ⚙️ Opções Disponíveis

| Flag          | Descrição                                                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-f, --force` | Sobrescreve o diretório se já existir                                                                                                                                        |
| `--lint`      | Configura automaticamente [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/)                                                                                   |
| `-t, --tests` | Prepara ambiente para testes unitários ([Vitest](https://vitest.dev/), [Jest](https://jestjs.io/pt-BR/) ou [Node Test Runner](https://nodejs.org/api/test.html#test-runner)) |
| `-r, --root`  | Cria o template na raiz atual (ao invés de criar uma nova pasta)                                                                                                             |

### 💡 Exemplo com Flags

```bash
npx @darlan0307/api-boilerplate minha-api --lint --tests
```

### 🏗️ Arquitetura

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
- **shared**: Reúne classes e funções genéricas, independentes de qualquer modelo específico, que podem ser reutilizadas em diversos pontos da aplicação.
- **@types**: Tipagens globais adicionais de bibliotecas/frameworks como o express, fastify e etc.

### 🔥 Próximas Funcionalidades

- 🐳 **Containerização** - Configuração Docker
- 🗄️ **Banco de Dados** - Integração com PostgreSQL, MongoDB e outros
- ⚡ **Cache** - Implementação de Redis, Memcached ou Node-cache
- 🔐 **Autenticação** - Templates com JWT e OAuth2

### 🤝 Contribuições

Contribuições são muito bem-vindas! Siga os passos abaixo:

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Instale** as dependências: `npm install`
4. **Crie** uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
5. **Desenvolva** usando: `npm run dev` (executa TypeScript com TSX)
6. **Verifique** seu código:
   - `npm run typecheck` - Verifica tipos do TypeScript
   - `npm run lint` - Executa o linter
   - `npm run format` - Formata o código
7. **Build**: `npm run build` para compilar
8. **Commit** suas alterações: `git commit -m 'feat: adiciona nova funcionalidade'`
9. **Push** para sua branch: `git push origin feature/nova-funcionalidade`
10. **Abra** um Pull Request explicando suas mudanças

#### 🛠️ Comandos de Desenvolvimento

```bash
npm run dev          # Executar CLI em modo desenvolvimento (TSX)
npm run build        # Compilar TypeScript para JavaScript
npm run typecheck    # Verificar tipos sem compilar
npm run lint         # Verificar código com ESLint
npm run lint:fix     # Corrigir problemas do ESLint automaticamente
npm run format       # Formatar código com Prettier
```

#### 📦 Tecnologias Utilizadas no CLI

- **TypeScript** - Linguagem principal
- **Commander.js** - Framework para CLI
- **Inquirer.js** - Prompts interativos
- **Chalk** - Colorização de terminal
- **Ora** - Spinners de carregamento
- **Vitest** - Framework de testes
- **ESLint + Prettier** - Qualidade de código

### 🐛 Reportando Bugs

Encontrou um problema? [Abra uma issue](../../issues) com:

- Descrição detalhada do erro
- Passos para reproduzir
- Ambiente (OS, Node.js version, etc.)

### 📄 Licença

Esse projeto está sob a licença (MIT) - acesse os detalhes [aqui](https://choosealicense.com/licenses/mit/).

### 👨‍💻 Autor

**Darlan Martins**

- 💼 [LinkedIn](https://www.linkedin.com/in/darlan-martins-8a7956259/)
- 📧 [Entre em contato](mailto:darlanchagas2020@gmail.com)

---

⭐ **Gostou do projeto?** Dê uma estrela no repositório para apoiar o desenvolvimento!
