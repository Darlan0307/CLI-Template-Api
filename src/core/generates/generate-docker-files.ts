import type { DatabaseType } from '../../types';

export function generateDockerfile(): string {
  return `FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
`;
}

export function generateDockerCompose(
  projectName: string,
  database: DatabaseType
): string {
  if (!database) {
    return `services:
  api:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: container_${projectName}_api
    ports:
      - "3000:3000"
    env_file: .env
    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - app_network

networks:
  app_network:
`;
  }

  if (database === 'mongodb') {
    return `services:
  mongodb:
    image: mongo:7.0
    container_name: container_${projectName}_mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=database_${projectName}
    networks:
      - app_network
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  api:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: container_${projectName}_api
    ports:
      - "3000:3000"
    env_file: .env
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      mongodb:
        condition: service_healthy
    networks:
      - app_network

volumes:
  mongodb_data:

networks:
  app_network:
`;
  }

  if (database === 'postgres') {
    return `services:
  postgres:
    image: postgres:16-alpine
    container_name: container_${projectName}_postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=database_${projectName}
    networks:
      - app_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  api:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: container_${projectName}_api
    ports:
      - "3000:3000"
    env_file: .env
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - app_network

volumes:
  postgres_data:

networks:
  app_network:
`;
  }

  if (database === 'mysql') {
    return `services:
  mysql:
    image: mysql:8.0
    container_name: container_${projectName}_mysql
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=database_${projectName}
      - MYSQL_USER=mysql
      - MYSQL_PASSWORD=mysql
    networks:
      - app_network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-proot"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  api:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: container_${projectName}_api
    ports:
      - "3000:3000"
    env_file: .env
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - app_network

volumes:
  mysql_data:

networks:
  app_network:
`;
  }

  return '';
}
