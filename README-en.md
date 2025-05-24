![Logo do projeto](./banner.png)

# 🚀 Api Boilerplate

> Você também pode ler em **[Português](./README.md)** 🇧🇷

## 📋 Introduction

A command-line tool (CLI) that speeds up the development of APIs in Node.js by generating pre-configured templates with best practices. It includes ready-made configurations for linting, TypeScript, testing and a well-structured architecture.

**📦 [Available on NPM](https://www.npmjs.com/package/@darlan0307/api-boilerplate)**

### 🛠️ Supported Frameworks

Choose from the main frameworks in the Node.js ecosystem:

- **[Express](https://expressjs.com/)**
- **[Fastify](https://fastify.dev/)**
- **[HonoJS](https://hono.dev/)**

### 🚀 Installation & Use

###### Direct Use (Recommended)

```bash
npx @darlan0307/api-boilerplate <project-name>
```

###### Global Installation

```bash
npm install -g @darlan0307/api-boilerplate
api-boilerplate <project-name>
```

###### Demonstration

[![Watch the video](https://img.youtube.com/vi/RRv9dDtHyng/3.jpg)](https://www.youtube.com/watch?v=RRv9dDtHyng)

### ⚙️ Available Options

| Flag          | Description                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-f, --force` | Overwrite the directory if it already exists                                                                                                                              |
| `--lint`      | Configures automatically [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)                                                                               |
| `-t, --tests` | Prepares environment for unit tests ([Vitest](https://vitest.dev/), [Jest](https://jestjs.io/pt-BR/) or [Node Test Runner](https://nodejs.org/api/test.html#test-runner)) |
| `-r, --root`  | Creates the template in the current root (instead of creating a new folder)                                                                                               |

### 💡 Example with Flags

```bash
npx @darlan0307/api-boilerplate my-api --lint --tests
```

### 🏗️ Architecture

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

- **main.ts**: It is the application's entry point, where configurations are loaded, classes are instantiated and the API is started.
- **infra**: It groups together resources that are essential for the system to function, but which are not part of the business domain.
- **shared**: It brings together generic classes and functions, independent of any specific model, which can be reused at various points in the application.
- **@types**: Additional global typing from libraries/frameworks such as express, fastify and so on.

### 🔥 Next Features

- 🐳 **Containerization** - Docker configuration
- 🗄️ **Database** - Integration with PostgreSQL, MongoDB and others
- ⚡ **Cache** - Implementation of Redis, Memcached or Node-cache
- 🔐 **Authentication** - Templates with JWT and OAuth2

### 🤝 Contributions

Contributions are very welcome! Follow the steps below:

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a branch for your feature: `git checkout -b feature/new-feature`
4. **Commit** your changes: `git commit -m 'feat: adds new feature'`
5. **Push** to your branch: `git push origin feature/new-feature`
6. **Open** a Pull Request explaining your changes

### 🐛 Reporting Bugs

Found a problem? [Open an Issue](../../issues) with:

- Detailed error description
- Steps to reproduce
- Environment (OS, Node.js version, etc.)

### 📄 License

This project is under the (MIT) license - find the details [here](https://choosealicense.com/licenses/mit/).

### 👨‍💻 Author

**Darlan Martins**

- 💼 [LinkedIn](https://www.linkedin.com/in/darlan-martins-8a7956259/)
- 📧 [Contact](mailto:darlanchagas2020@gmail.com)

---

⭐ **Liked the project?** Give a star to the repository to support the development!
