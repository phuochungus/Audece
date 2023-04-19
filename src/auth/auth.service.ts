import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateAccessTokenString(userId: string): string {
    return this.jwtService.sign({ _id: userId });
  }
}
