import { ProjectOptions } from '../../types';

export function generateFileIndexV1VersionRoutes(
  options: ProjectOptions
): string {
  return options.stack === 'express'
    ? `import { Router } from "express"
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
`
    : '';
}

export function generateFileV1HttpRoutes(options: ProjectOptions): string {
  return options.stack === 'express'
    ? `import { Router } from "express"
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
`
    : '';
}

export function generateFileV1HttpIndex(): string {
  return `export * from "./routes"`;
}
