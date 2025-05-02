export function generateReadme(projectName) {
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
