import type { ProjectOptions } from '../../types/index.js';

export function generateEnvFile(_options: ProjectOptions): string {
  return `PORT=3000
LOG_LEVEL=debug
`;
}
