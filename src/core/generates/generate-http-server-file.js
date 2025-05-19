export function generateExpressHttpServerFile() {
  return `
  import express, { Request, Response, Express, Router } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { logger } from "@infra/logger";

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
    this.app.get("/ping", async (req: Request, res: Response) => {
      res.status(200).send("pong");
    });

    const router = Router();
    this.app.use(router);
    // Criação das rotas
    // createEntityRoutes(router);
  }
}
  `;
}

export function generateFastifyHttpServerFile() {
  return `
  import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import compression from "@fastify/compress"
import { logger } from "@infra/logger"

export default class HttpServer {
  private app: FastifyInstance

  constructor() {
    this.app = fastify()
  }

  async createApp(): Promise<FastifyInstance> {
    await this.loadMiddlewares()
    this.loadRoutes()
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

  private loadRoutes(): void {
    // Rota simples para verificação de saúde
    this.app.get("/ping", async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.code(200).send("pong")
    })

    // Criação das rotas da entidade;
  }
}
`;
}
