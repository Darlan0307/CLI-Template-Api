
  import { Hono } from "hono"
import { cors } from "hono/cors"
import { secureHeaders } from "hono/secure-headers"
import { compress } from "hono/compress"
import { logger } from "@infra/logger"
import { serve } from "@hono/node-server"

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
    this.app.get("/ping", (c) => {
      return c.text("pong", 200)
    })

    // Aqui você adicionaria as rotas da entidade
  }
}

  