export function generateGitignore() {
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
