import { ProjectOptions } from '../../types';

export function generateFileIndexV1VersionRoutes(
  options: ProjectOptions
): string {
  if (options.stack === 'express') {
    return `import { Router } from "express"
import { userRoutesV1 } from "./example-users/http"

export const v1Routes = Router()

// Registra todas as rotas da v1
v1Routes.use("/users", userRoutesV1)

// Rota de informação da versão
v1Routes.get("/", (_req, res) => {
  res.json({
    version: "v1",
    description: "API versão 1"
  })
})
`;
  }

  if (options.stack === 'fastify') {
    return `import { FastifyInstance } from "fastify"
import { userRoutesV1 } from "./example-users/http"

export async function v1Routes(_fastify: FastifyInstance) {
  // Registra todas as rotas da v1
  await fastify.register(userRoutesV1, { prefix: "/users" })

  // Rota de informação da versão
  fastify.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({
      version: "v1",
      description: "API versão 1"
    })
  })
}
`;
  }

  if (options.stack === 'hono') {
    return `import { Hono } from "hono"
import { userRoutesV1 } from "./example-users/http"

export const v1Routes = new Hono()

// Registra todas as rotas da v1
v1Routes.route("/users", userRoutesV1)

// Rota de informação da versão
v1Routes.get("/", (c) => {
  return c.json({
    version: "v1",
    description: "API versão 1"
  })
})
`;
  }

  return '';
}

export function generateFileV1HttpRoutes(options: ProjectOptions): string {
  if (options.stack === 'express') {
    return `import { Router } from "express"
// import { PrismaUserRepository } from "../repository"
// import UserHttpController from "./controller"
// import { UserCreateUseCase } from "../use-cases"

export const userRoutesV1 = Router()

// Factory function para criar o controller com suas dependências
// function createUserController() {
//   const userRepository = new PrismaUserRepository()

//   return new UserHttpController({
//     get: new UserGetUseCase(userRepository),
//     save: new UserCreateUseCase(userRepository),
//     update: new UserUpdateUseCase(userRepository),
//     delete: new UserDeleteUseCase(userRepository),
//     list: new UserListUseCase(userRepository)
//   })
// }

// const controller = createUserController()

// Registra todas as rotas da v1
// userRoutesV1.post("/", async (req: Request, res: Response) => {
//   const httpResponse = await controller.create(req)
//   res.status(httpResponse.statusCode).json(httpResponse.body)
// })

// userRoutesV1.get("/", async (req: Request, res: Response) => {
//   const httpResponse = await controller.list(req)
//   res.status(httpResponse.statusCode).json(httpResponse.body)
// })
`;
  }

  if (options.stack === 'fastify') {
    return `import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
// import { PrismaUserRepository } from "../repository"
// import UserHttpController from "./controller"
// import { UserCreateUseCase } from "../use-cases"

export async function userRoutesV1(fastify: FastifyInstance) {
  // Factory function para criar o controller com suas dependências
  // function createUserController() {
  //   const userRepository = new PrismaUserRepository()
  //
  //   return new UserHttpController({
  //     get: new UserGetUseCase(userRepository),
  //     save: new UserCreateUseCase(userRepository),
  //     update: new UserUpdateUseCase(userRepository),
  //     delete: new UserDeleteUseCase(userRepository),
  //     list: new UserListUseCase(userRepository)
  //   })
  // }
  //
  // const controller = createUserController()

  // Registra todas as rotas da v1
  // fastify.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
  //   const httpResponse = await controller.create(request)
  //   return reply.code(httpResponse.statusCode).send(httpResponse.body)
  // })

  // fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  //   const httpResponse = await controller.list(request)
  //   return reply.code(httpResponse.statusCode).send(httpResponse.body)
  // })
}
`;
  }

  if (options.stack === 'hono') {
    return `import { Hono } from "hono"
// import { PrismaUserRepository } from "../repository"
// import UserHttpController from "./controller"
// import { UserCreateUseCase } from "../use-cases"

export const userRoutesV1 = new Hono()

// Factory function para criar o controller com suas dependências
// function createUserController() {
//   const userRepository = new PrismaUserRepository()
//
//   return new UserHttpController({
//     get: new UserGetUseCase(userRepository),
//     save: new UserCreateUseCase(userRepository),
//     update: new UserUpdateUseCase(userRepository),
//     delete: new UserDeleteUseCase(userRepository),
//     list: new UserListUseCase(userRepository)
//   })
// }
//
// const controller = createUserController()

// Registra todas as rotas da v1
// userRoutesV1.post("/", async (c) => {
//   const httpResponse = await controller.create(c.req)
//   return c.json(httpResponse.body, httpResponse.statusCode)
// })

// userRoutesV1.get("/", async (c) => {
//   const httpResponse = await controller.list(c.req)
//   return c.json(httpResponse.body, httpResponse.statusCode)
// })
`;
  }

  return '';
}

export function generateFileV1HttpIndex(): string {
  return `export * from "./routes"`;
}
