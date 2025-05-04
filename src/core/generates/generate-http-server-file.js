export function generateHttpServerFile() {
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
