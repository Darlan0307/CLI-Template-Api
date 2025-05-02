export function generateEnvFile(options) {
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
