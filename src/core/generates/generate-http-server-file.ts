export function generateExpressHttpServerFile(): string {
  return `import express, { Request, Response, Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { logger } from "@infra/logger";
import { v1Routes } from "@app/v1"

export default class HttpServer {
  private app: Express;

  constructor() {
    this.app = express();
  }

  async createApp(): Promise<Express> {
    this.loadMiddlewares();
    this.loadRoutes();
    return this.app;
  }

  async stop(): Promise<void> {
    logger.info("Stopping...");
  }

  private loadMiddlewares(): void {
    this.app.use(cors());

    // protege contra vulnerabilidades comuns
    this.app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: false,
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // comprime respostas HTTP para otimizar o desempenho
    this.app.use(compression());
    // this.app.use(createAuthMiddleware());
  }

  private loadRoutes(): void {

    this.app.get("/", async (_req: Request, res: Response) => {
      res.json({
        message: "Servidor rodando...",
      })
    })

    this.app.get("/health", async (_req: Request, res: Response) => {
      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      })
    })

    this.app.use("/api/v1", v1Routes)

    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: {
          code: "ENDPOINT_NOT_FOUND",
          message: "Endpoint not found",
          path: req.originalUrl,
        }
      })
    })
  }
}
  `;
}

export function generateFastifyHttpServerFile(): string {
  return `import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import compression from "@fastify/compress"
import { logger } from "@infra/logger"
import { v1Routes } from "@app/v1"

export default class HttpServer {
  private app: FastifyInstance

  constructor() {
    this.app = fastify()
  }

  async createApp(): Promise<FastifyInstance> {
    await this.loadMiddlewares()
    await this.loadRoutes()
    return this.app
  }

  async stop(): Promise<void> {
    logger.info("Stopping...")
    await this.app.close()
  }

  private async loadMiddlewares(): Promise<void> {
    await this.app.register(cors)

    // Registra o plugin helmet para proteção contra vulnerabilidades comuns
    await this.app.register(helmet, {
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
      crossOriginOpenerPolicy: false
    })

    await this.app.register(compression)

    // Middleware de autenticação seria registrado aqui
    // await this.app.register(createAuthMiddleware);
  }

  private async loadRoutes(): Promise<void> {
    // Rota principal
    this.app.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({
        message: "Servidor rodando..."
      })
    })

    // Rota de health check
    this.app.get("/health", async (_request: FastifyRequest, reply: FastifyReply) => {
      return reply.code(200).send({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      })
    })

    // Registra as rotas versionadas
    await this.app.register(v1Routes, { prefix: "/api/v1" })

    // Handler 404
    this.app.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
      return reply.code(404).send({
        error: {
          code: "ENDPOINT_NOT_FOUND",
          message: "Endpoint not found",
          path: request.url
        }
      })
    })
  }
}
`;
}

export function generateHonoHttpServerFile(): string {
  return `import { Hono } from "hono"
import { cors } from "hono/cors"
import { secureHeaders } from "hono/secure-headers"
import { compress } from "hono/compress"
import { logger } from "@infra/logger"
import { serve } from "@hono/node-server"
import { v1Routes } from "@app/v1"

type AppResponse = { listen: (port: number, callback: () => void) => void }

export default class HttpServer {
  private app: Hono

  constructor() {
    this.app = new Hono()
  }

  async createApp(): Promise<AppResponse> {
    this.loadMiddlewares()
    this.loadRoutes()

    return {
      listen: (port: number, callback: () => void) => {
        serve({ fetch: this.app.fetch, port }, callback)
      }
    }
  }

  async stop(): Promise<void> {
    logger.info("Stopping...")
  }

  private loadMiddlewares(): void {
    this.app.use("*", cors())

    this.app.use(
      "*",
      secureHeaders({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: false
      })
    )

    this.app.use("*", compress())

    // Middleware de autenticação quando necessário
    // this.app.use('*', authMiddleware());
  }

  private loadRoutes(): void {
    // Rota principal
    this.app.get("/", (c) => {
      return c.json({
        message: "Servidor rodando..."
      })
    })

    // Rota de health check
    this.app.get("/health", (c) => {
      return c.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      }, 200)
    })

    // Registra as rotas versionadas
    this.app.route("/api/v1", v1Routes)

    // Handler 404
    this.app.notFound((c) => {
      return c.json({
        error: {
          code: "ENDPOINT_NOT_FOUND",
          message: "Endpoint not found",
          path: c.req.path
        }
      }, 404)
    })
  }
}

  `;
}
