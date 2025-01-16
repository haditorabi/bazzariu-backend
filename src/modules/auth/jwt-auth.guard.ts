import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Use a secure secret in production

  canActivate(context: ExecutionContext): boolean {
    // Extract the request from the GraphQL context
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    // Check if the Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        'Unauthorized: No authorization header provided',
      );
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    if (!this.validateToken(token)) {
      throw new UnauthorizedException('Unauthorized: No token provided');
    }

    // Validate the token and extract the user
    const user = this.validateTokenAndExtractUser(token);
    if (!user) {
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }

    // Attach the user to the request for further use
    req.user = user;
    return true;
  }

  validateTokenAndExtractUser(token: string): any {
    try {
      // Decode and verify the token
      const decoded = jwt.verify(token, this.secretKey);

      // Example: Return the decoded user payload
      return decoded;
    } catch (error) {
      // Token validation failed
      return error;
    }
  }
  validateToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.secretKey); // Verifies the token using the secret key
      return !!decoded; // Return the decoded payload
    } catch (error) {
      throw new Error(`Invalid token: ${error.message}`);
    }
  }
}
