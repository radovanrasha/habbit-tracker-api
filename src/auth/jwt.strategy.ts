import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_secret_key', // Use a config service to manage secret keys securely
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(
      payload.username,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
