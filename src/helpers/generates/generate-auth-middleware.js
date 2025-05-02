export function generateAuthMiddlewareFile(options) {
  return `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Definição de interface para usuário autenticado
export interface AuthenticatedRequest extends Request {
  user?: any;
}

// Middleware de verificação de token JWT
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        message: 'Token não fornecido',
      });
    }
    
    // Extrair o token (Bearer <token>)
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Token não fornecido',
      });
    }
    
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    
    // Adicionar o usuário decodificado ao objeto de requisição
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: 'error',
        message: 'Token inválido',
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: 'error',
        message: 'Token expirado',
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Erro ao autenticar',
      });
    }
  }
};
`;
}
