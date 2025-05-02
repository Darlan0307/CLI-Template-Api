import fs from "fs";
import path from "path";
import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";

// Versão da CLI
const version = "1.0.0";

program
  .version(version)
  .description("CLI para gerar uma estrutura de API em Node.js com Express")
  .argument("[nome-do-projeto]", "Nome do projeto")
  .option(
    "-d, --database <database>",
    "Tipo de banco de dados (mongodb, mysql, postgresql)",
    "mongodb"
  )
  .option("-a, --auth", "Incluir autenticação JWT", false)
  .option("-t, --typescript", "Usar TypeScript", false)
  .option("-f, --force", "Sobrescrever diretório se já existir", false)
  .action(async (projectName, options) => {
    console.log(chalk.blue.bold("🚀 Express API Generator"));

    // Se o nome do projeto não for fornecido, perguntar
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Nome do projeto:",
          default: "express-api",
          validate: (input) => {
            if (input.trim() === "") return "O nome do projeto é obrigatório";
            return true;
          },
        },
      ]);
      projectName = answers.projectName;
    }

    // Configurações adicionais via prompt
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "database",
        message: "Qual banco de dados você deseja utilizar?",
        default: options.database,
        choices: ["mongodb", "mysql", "postgresql", "nenhum"],
      },
      {
        type: "confirm",
        name: "auth",
        message: "Incluir autenticação JWT?",
        default: options.auth,
      },
      {
        type: "confirm",
        name: "typescript",
        message: "Usar TypeScript?",
        default: options.typescript,
      },
    ]);

    // Mesclar opções da linha de comando com respostas do prompt
    const projectOptions = {
      ...options,
      database: answers.database,
      auth: answers.auth,
      typescript: answers.typescript,
    };

    // Criar estrutura do projeto
    await createProject(projectName, projectOptions);
  });

program.parse(process.argv);

async function createProject(projectName, options) {
  const projectPath = path.join(process.cwd(), projectName);

  // Verificar se o diretório já existe
  if (fs.existsSync(projectPath)) {
    if (options.force) {
      console.log(
        chalk.yellow(`Diretório ${projectName} já existe. Sobrescrevendo...`)
      );
    } else {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Diretório ${projectName} já existe. Deseja sobrescrever?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.red("Operação cancelada."));
        return;
      }
    }
  }

  // Criar diretório do projeto
  const spinner = ora("Criando estrutura do projeto...").start();

  try {
    await createDirectoryStructure(projectPath, options);
    await createFiles(projectPath, projectName, options);

    spinner.succeed(chalk.green("Estrutura do projeto criada com sucesso!"));

    console.log("\n📁 Estrutura do projeto:");
    console.log(chalk.cyan(`${projectName}/`));
    console.log(chalk.cyan(`├── src/`));
    console.log(chalk.cyan(`│   ├── controllers/`));
    console.log(chalk.cyan(`│   ├── models/`));
    console.log(chalk.cyan(`│   ├── routes/`));
    console.log(chalk.cyan(`│   ├── middlewares/`));
    console.log(chalk.cyan(`│   ├── config/`));
    console.log(chalk.cyan(`│   └── utils/`));
    console.log(chalk.cyan(`├── .env`));
    console.log(chalk.cyan(`├── .gitignore`));
    console.log(chalk.cyan(`├── package.json`));
    console.log(chalk.cyan(`└── README.md`));

    console.log("\n🚀 Para iniciar o projeto:");
    console.log(chalk.yellow(`cd ${projectName}`));
    console.log(chalk.yellow(`npm install`));
    console.log(chalk.yellow(`npm run dev`));
  } catch (error) {
    spinner.fail(chalk.red(`Erro ao criar projeto: ${error.message}`));
    process.exit(1);
  }
}

async function createDirectoryStructure(projectPath, options) {
  // Criar diretório principal se não existir
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  // Criar subdiretórios
  const directories = [
    "src",
    "src/controllers",
    "src/models",
    "src/routes",
    "src/middlewares",
    "src/config",
    "src/utils",
    "tests",
  ];

  directories.forEach((dir) => {
    const dirPath = path.join(projectPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

async function createFiles(projectPath, projectName, options) {
  // Criar package.json
  const packageJsonContent = generatePackageJson(projectName, options);
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJsonContent, null, 2)
  );

  // Criar .env
  fs.writeFileSync(path.join(projectPath, ".env"), generateEnvFile(options));

  // Criar .gitignore
  fs.writeFileSync(path.join(projectPath, ".gitignore"), generateGitignore());

  // Criar README.md
  fs.writeFileSync(
    path.join(projectPath, "README.md"),
    generateReadme(projectName)
  );

  // Criar app.js ou app.ts
  const mainFile = options.typescript ? "app.ts" : "app.js";
  // fs.writeFileSync(
  //   path.join(projectPath, "src", mainFile),
  //   generateAppFile(options)
  // );

  // Criar server.js ou server.ts
  // const serverFile = options.typescript ? "server.ts" : "server.js";
  // fs.writeFileSync(
  //   path.join(projectPath, "src", serverFile),
  //   generateServerFile(options)
  // );

  // Criar arquivo de configuração de banco de dados
  // if (options.database !== "nenhum") {
  //   const dbConfigFile = options.typescript ? "database.ts" : "database.js";
  //   fs.writeFileSync(
  //     path.join(projectPath, "src", "config", dbConfigFile),
  //     generateDbConfigFile(options)
  //   );
  // }

  // Se autenticação estiver ativada, criar arquivos relacionados
  if (options.auth) {
    // Middleware de autenticação
    const authMiddlewareFile = options.typescript
      ? "auth.middleware.ts"
      : "auth.middleware.js";
    fs.writeFileSync(
      path.join(projectPath, "src", "middlewares", authMiddlewareFile),
      generateAuthMiddlewareFile(options)
    );
  }
}

function generatePackageJson(projectName, options) {
  const dependencies = {
    express: "^4.18.2",
    dotenv: "^16.0.3",
    cors: "^2.8.5",
    helmet: "^6.0.1",
    morgan: "^1.10.0",
  };

  const devDependencies = {
    nodemon: "^2.0.20",
    jest: "^29.4.1",
  };

  // Adicionar dependências específicas com base nas opções
  if (options.database === "mongodb") {
    dependencies["mongoose"] = "^6.9.0";
  } else if (options.database === "mysql") {
    dependencies["mysql2"] = "^3.1.0";
    dependencies["sequelize"] = "^6.28.0";
  } else if (options.database === "postgresql") {
    dependencies["pg"] = "^8.9.0";
    dependencies["pg-hstore"] = "^2.3.4";
    dependencies["sequelize"] = "^6.28.0";
  }

  if (options.auth) {
    dependencies["jsonwebtoken"] = "^9.0.0";
    dependencies["bcryptjs"] = "^2.4.3";
  }

  if (options.typescript) {
    devDependencies["typescript"] = "^4.9.5";
    devDependencies["@types/node"] = "^18.11.18";
    devDependencies["@types/express"] = "^4.17.17";
    devDependencies["ts-node"] = "^10.9.1";
    devDependencies["ts-node-dev"] = "^2.0.0";

    if (options.auth) {
      devDependencies["@types/jsonwebtoken"] = "^9.0.1";
      devDependencies["@types/bcryptjs"] = "^2.4.2";
    }
  }

  const scripts = {
    start: options.typescript ? "ts-node src/server.ts" : "node src/server.js",
    dev: options.typescript
      ? "ts-node-dev --respawn src/server.ts"
      : "nodemon src/server.js",
    test: "jest",
  };

  if (options.typescript) {
    scripts["build"] = "tsc";
  }

  return {
    name: projectName.toLowerCase().replace(/\s+/g, "-"),
    version: "1.0.0",
    description: "API gerada com express-api-generator",
    main: options.typescript ? "dist/server.js" : "src/server.js",
    scripts,
    keywords: ["express", "api", "nodejs"],
    author: "",
    license: "MIT",
    dependencies,
    devDependencies,
  };
}

function generateEnvFile(options) {
  let content = `NODE_ENV=development
PORT=3000
`;

  if (options.database === "mongodb") {
    content += `MONGODB_URI=mongodb://localhost:27017/${
      options.projectName || "express-api"
    }\n`;
  } else if (options.database === "mysql") {
    content += `DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=${options.projectName || "express_api"}
DB_PORT=3306\n`;
  } else if (options.database === "postgresql") {
    content += `DB_HOST=localhost
DB_USER=postgres
DB_PASS=postgres
DB_NAME=${options.projectName || "express_api"}
DB_PORT=5432\n`;
  }

  if (options.auth) {
    content += `JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d\n`;
  }

  return content;
}

function generateGitignore() {
  return `# Dependências
node_modules/
npm-debug.log
yarn-error.log
yarn-debug.log
package-lock.json

# Build
dist/
build/

# Ambiente
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Sistema
.DS_Store
Thumbs.db

# Editores
.idea/
.vscode/
*.swp
*.swo
`;
}

function generateReadme(projectName) {
  return `# ${projectName}

API REST desenvolvida com Node.js e Express.

## Início rápido

\`\`\`bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Executar em modo de produção
npm start
\`\`\`

## Estrutura do projeto

\`\`\`
src/
  ├── controllers/  # Controladores da aplicação
  ├── models/       # Modelos de dados
  ├── routes/       # Rotas da API
  ├── middlewares/  # Middlewares personalizados
  ├── config/       # Configurações da aplicação
  ├── utils/        # Funções utilitárias
  ├── app.js        # Configuração do Express
  └── server.js     # Ponto de entrada da aplicação
\`\`\`

## Documentação da API

### Endpoints

- \`GET /api/examples\`: Retorna todos os exemplos
- \`GET /api/examples/:id\`: Retorna um exemplo específico
- \`POST /api/examples\`: Cria um novo exemplo
- \`PUT /api/examples/:id\`: Atualiza um exemplo existente
- \`DELETE /api/examples/:id\`: Remove um exemplo existente

## Scripts disponíveis

- \`npm start\`: Inicia o servidor em modo de produção
- \`npm run dev\`: Inicia o servidor em modo de desenvolvimento com hot-reload
- \`npm test\`: Executa os testes

## Licença

MIT
`;
}

function generateAuthMiddlewareFile(options) {
  return `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Definição de interface para usuário autenticado
export interface AuthenticatedRequest extends Request {
  user?: any;
}

// Middleware de verificação de token JWT
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        message: 'Token não fornecido',
      });
    }
    
    // Extrair o token (Bearer <token>)
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Token não fornecido',
      });
    }
    
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    
    // Adicionar o usuário decodificado ao objeto de requisição
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: 'error',
        message: 'Token inválido',
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: 'error',
        message: 'Token expirado',
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Erro ao autenticar',
      });
    }
  }
};
`;
}
