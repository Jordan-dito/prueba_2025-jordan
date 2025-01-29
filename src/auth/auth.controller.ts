import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @HttpCode(200) // Permite devolver un 200 en lugar de 201
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Autentica a un usuario y devuelve un token JWT.',
  })
  @ApiBody({
    schema: {
      example: { username: 'admin', password: 'password123' },
    },
  })
  async login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const { username, password } = body;

    // Utiliza await ya que findByUsername es síncrono en este caso
    const user = this.usersService.findByUsername(username);

    // Usa await para validar la contraseña
    if (
      !user ||
      !(await this.usersService.validatePassword(password, user.password))
    ) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const token = this.authService.login(user).access_token;

    // Configura la cookie con el token
    res.cookie('jwt', token, { httpOnly: true, secure: true });
    return res.send({ message: 'Inicio de sesión exitoso' });
  }
}
