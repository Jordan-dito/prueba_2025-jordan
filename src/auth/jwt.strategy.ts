import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // Importa la interfaz
import { ConfigService } from '@nestjs/config'; // Importa el servicio de configuración

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Inyecta el servicio de configuración
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Usa la clave secreta desde las variables de entorno
    });
  }

  validate(payload: JwtPayload) {
    // Usa la interfaz JwtPayload aquí
    return { userId: payload.sub, username: payload.username };
  }
}
