import type { ProjectOptions } from '../../types/index.js';

export function generateEnvFile(_options: ProjectOptions): string {
  return `PORT=3000
LOG_LEVEL=debug
NODE_ENV=development
`;
}

export function generateValidationEnvFile(): string {
  return `import { z } from "zod"

const envSchema = z.object({
  PORT: z.string({ error: "PORT deve ser definido" }).transform((port) => Number(port)),
  NODE_ENV: z.enum(["development", "production", "test"], { error: "NODE_ENV deve ser definido" }),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"], { error: "LOG_LEVEL deve ser definido" }),
})

type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    console.error("Variáveis de ambiente inválidas:")
    console.error(result.error.format())
    process.exit(1)
  }

  return result.data
}

export const env = validateEnv()`;
}
