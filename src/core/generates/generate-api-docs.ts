import type { StackType } from '../../types';

// ========== EXPRESS ==========

export function generateExpressSwaggerConfig(): string {
  return `import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync, readdirSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';

export class SwaggerConfig {
  static setup(app: Express): void {
    const docsPath = join(process.cwd(), 'docs', 'openapi');

    // Carrega os schemas OpenAPI modulares
    const v1Schema = this.buildSchema(join(docsPath, 'v1'));

    const swaggerOptions = {
      explorer: true,
      swaggerOptions: {
        urls: [
          {
            url: '/api/v1/docs/swagger.json',
            name: 'API v1 (Current)',
          },
        ],
      },
    };

    app.use('/api/docs', swaggerUi.serve);
    app.get('/api/docs', swaggerUi.setup(v1Schema, swaggerOptions));

    app.get('/api/v1/docs/swagger.json', (_req, res) => {
      res.json(v1Schema);
    });

    app.use('/api/v1/docs', swaggerUi.serve);
    app.get('/api/v1/docs', (_req, res) => {
      const html = swaggerUi.generateHTML(v1Schema, {
        customSiteTitle: 'API v1 Documentation',
      });
      res.send(html);
    });
  }

  private static buildSchema(versionPath: string): Record<string, unknown> {
    // Carrega o arquivo principal (index.yaml)
    const indexPath = join(versionPath, 'index.yaml');
    const schema = this.loadYAML(indexPath);

    if (!schema.components) {
      schema.components = {};
    }

    const components = schema.components as Record<string, unknown>;

    // Carrega os schemas (models) ANTES dos paths
    const schemasDir = join(versionPath, 'schemas');
    const schemas = this.loadDirectory(schemasDir);
    components.schemas = { ...(components.schemas as object), ...schemas };

    // Carrega schemas comuns (se existir)
    const commonPath = join(process.cwd(), 'docs', 'openapi', 'common');
    try {
      const commonSchemas = this.loadYAML(join(commonPath, 'schemas.yaml'));
      components.schemas = {
        ...(components.schemas as object),
        ...commonSchemas,
      };

      const commonResponses = this.loadYAML(join(commonPath, 'responses.yaml'));
      components.responses = {
        ...(components.responses as object),
        ...commonResponses,
      };
    } catch {
      // Common schemas são opcionais
    }

    // Carrega os paths (endpoints) DEPOIS dos schemas
    const pathsDir = join(versionPath, 'paths');
    const paths = this.loadDirectory(pathsDir);
    schema.paths = { ...(schema.paths as object), ...paths };

    return schema;
  }

  private static loadDirectory(dirPath: string): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    try {
      const files = readdirSync(dirPath).filter((f) => f.endsWith('.yaml'));

      for (const file of files) {
        const filePath = join(dirPath, file);
        const content = this.loadYAML(filePath);
        Object.assign(result, content);
      }
    } catch {
      // Diretório pode não existir
    }

    return result;
  }

  private static loadYAML(filePath: string): Record<string, unknown> {
    try {
      const fileContent = readFileSync(filePath, 'utf8');
      return (load(fileContent) as Record<string, unknown>) || {};
    } catch {
      return {};
    }
  }
}
`;
}

// ========== FASTIFY ==========

export function generateFastifySwaggerConfig(): string {
  return `import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export class SwaggerConfig {
  static async setup(app: FastifyInstance): Promise<void> {
    // Registra o plugin Swagger
    await app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'API Documentation',
          description: 'API Documentation with Swagger',
          version: '1.0.0',
        },
        servers: [
          {
            url: 'http://localhost:3000',
            description: 'Development server',
          },
        ],
        tags: [
          { name: 'Users', description: 'User endpoints' },
          { name: 'Info', description: 'API information' },
        ],
      },
    });

    // Registra o Swagger UI
    await app.register(fastifySwaggerUi, {
      routePrefix: '/api/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: true,
      },
      staticCSP: true,
    });
  }
}
`;
}

// ========== HONO ==========

export function generateHonoSwaggerConfig(): string {
  return `import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';

// Cria a aplicação OpenAPI
export function createSwaggerApp(): OpenAPIHono {
  const app = new OpenAPIHono();

  // Define o schema OpenAPI
  app.doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'API Documentation',
      description: 'API Documentation with OpenAPI',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  });

  // Adiciona Swagger UI
  app.get(
    '/ui',
    swaggerUI({
      url: '/api/docs/openapi.json',
    })
  );

  return app;
}
`;
}

// ========== YAML FILES ==========

export function generateOpenAPIV1Index(): string {
  return `openapi: 3.0.0
info:
  title: API v1
  description: API versão 1.
  version: 1.0.0
  contact:
    name: API Support
    email: support@api.com

servers:
  - url: http://localhost:3000/api/v1
    description: Development server
  - url: https://api.example.com/api/v1
    description: Production server

tags:
  - name: Info
    description: Informações da API
  - name: Users
    description: Endpoints de usuários
`;
}

export function generateOpenAPIUsersPaths(): string {
  return `/users:
  get:
    summary: Listar todos os usuários
    description: Retorna uma lista com todos os usuários cadastrados
    tags: [Users]
    responses:
      '200':
        description: Lista de usuários
        content:
          application/json:
            schema:
              type: object
              properties:
                users:
                  type: array
                  items:
                    $ref: '#/components/schemas/UserV1'

  post:
    summary: Criar novo usuário
    tags: [Users]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CreateUserV1'
    responses:
      '201':
        description: Usuário criado
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  $ref: '#/components/schemas/UserV1'
      '400':
        $ref: '#/components/responses/BadRequest'

/users/{id}:
  get:
    summary: Buscar usuário por ID
    tags: [Users]
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    responses:
      '200':
        description: Dados do usuário
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  $ref: '#/components/schemas/UserV1'
      '404':
        description: Usuário não encontrado

  put:
    summary: Atualizar usuário
    tags: [Users]
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CreateUserV1'
    responses:
      '200':
        description: Usuário atualizado
      '404':
        description: Usuário não encontrado
      '400':
        $ref: '#/components/responses/BadRequest'

  delete:
    summary: Remover usuário
    tags: [Users]
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    responses:
      '204':
        description: Usuário removido
      '404':
        description: Usuário não encontrado
`;
}

export function generateOpenAPIUserSchemas(): string {
  return `UserV1:
  type: object
  properties:
    id:
      type: integer
      example: 1
    name:
      type: string
      example: João Silva
    email:
      type: string
      format: email
      example: joao@email.com
  required: [id, name, email]

CreateUserV1:
  type: object
  properties:
    name:
      type: string
      example: João Silva
    email:
      type: string
      format: email
      example: joao@email.com
  required: [name, email]
`;
}

export function generateOpenAPICommonSchemas(): string {
  return `ErrorResponse:
  type: object
  properties:
    error:
      type: object
      properties:
        code:
          type: string
          example: RESOURCE_NOT_FOUND
        message:
          type: string
          example: Resource not found
        details:
          type: string
`;
}

export function generateOpenAPICommonResponses(): string {
  return `BadRequest:
  description: Requisição inválida
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/ErrorResponse'
`;
}

// ========== FASTIFY ROUTE EXAMPLES ==========

export function generateFastifyDocsRoute(): string {
  return `import { FastifyInstance } from 'fastify';

export async function docsRoutes(fastify: FastifyInstance) {
  // Exemplo de rota com schema para documentação
  fastify.get(
    '/users',
    {
      schema: {
        description: 'Listar todos os usuários',
        tags: ['Users'],
        response: {
          200: {
            description: 'Lista de usuários',
            type: 'object',
            properties: {
              users: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (_request, reply) => {
      return reply.send({
        users: [
          { id: 1, name: 'João Silva', email: 'joao@email.com' },
        ],
      });
    }
  );

  fastify.post(
    '/users',
    {
      schema: {
        description: 'Criar novo usuário',
        tags: ['Users'],
        body: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
        response: {
          201: {
            description: 'Usuário criado',
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body as { name: string; email: string };
      return reply.code(201).send({
        user: { id: 1, name, email },
      });
    }
  );
}
`;
}

// ========== HONO ROUTE EXAMPLES ==========

export function generateHonoDocsRoute(): string {
  return `import { createRoute, z, OpenAPIHono } from '@hono/zod-openapi';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export function createDocsRoutes(): OpenAPIHono {
  const app = new OpenAPIHono();

  // GET /users
  const listUsersRoute = createRoute({
    method: 'get',
    path: '/users',
    tags: ['Users'],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              users: z.array(UserSchema),
            }),
          },
        },
        description: 'Lista de usuários',
      },
    },
  });

  app.openapi(listUsersRoute, (c) => {
    return c.json({
      users: [{ id: 1, name: 'João Silva', email: 'joao@email.com' }],
    });
  });

  // POST /users
  const createUserRoute = createRoute({
    method: 'post',
    path: '/users',
    tags: ['Users'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateUserSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: z.object({
              user: UserSchema,
            }),
          },
        },
        description: 'Usuário criado',
      },
    },
  });

  app.openapi(createUserRoute, (c) => {
    const data = c.req.valid('json');
    return c.json({ user: { id: 1, ...data } }, 201);
  });

  return app;
}
`;
}

export function generateSwaggerConfigForStack(stack: StackType): string {
  if (stack === 'express') {
    return generateExpressSwaggerConfig();
  } else if (stack === 'fastify') {
    return generateFastifySwaggerConfig();
  } else {
    return generateHonoSwaggerConfig();
  }
}
