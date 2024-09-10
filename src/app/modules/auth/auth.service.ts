import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { BadRequestException, Injectable, Req, Res } from '@nestjs/common';
import { CurrentUser } from './decorators/user.decorator';
import { SignupDto } from './dto/sign-up.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  _jwtSecret: string;
  _frontEndUrl: string;
  constructor(
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this._jwtSecret = this.configService.get('JWT_SECRET');
    this._frontEndUrl = this.configService.get('FRONTEND_URL');
  }
  async validateUser(email: string, pass: string): Promise<{ data: User }> {
    try {
      const { data: user } = await this.usersService.findBy('email', email);
      const { password, ...result } = user;
      await this.verifyPassword(pass, password);
      await this.usersService.isVerified(email);
      return { data: result as User };
    } catch {
      throw new BadRequestException('Les identifiants saisis sont invalides');
    }
  }

  async signIn(@CurrentUser() user: User): Promise<{ access_token: string }> {
    try {
      const access_token = await this.generateToken(user, '1d');
      return { access_token };
    } catch {
      throw new BadRequestException('Les identifiants saisis sont invalides');
    }
  }

  async signUp(dto: SignupDto): Promise<{ data: User }> {
    const { data } = await this.usersService.signUp(dto);
    const token = await this.generateToken(data, '30min');
    this.eventEmitter.emit('user.sign-up', { user: data, token });
    return { data };
  }

  async verifyUserEmail(email: string): Promise<{ data: User }> {
    try {
      const { data } = await this.usersService.verifyUserEmail(email);
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la vérification de l'email");
    }
  }

  async verifyPassword(password: string, encrypted: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, encrypted);
    if (!isMatch) throw new BadRequestException();
    return isMatch;
  }

  async generateToken(user: User, expiresIn: string): Promise<string> {
    const payload = { sub: user.id, name: user.name };
    return await this.jwtService.signAsync(payload, { secret: this._jwtSecret, expiresIn });
  }

  async verifyToken(token: string): Promise<{ data: User }> {
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this._jwtSecret });
      const { data } = await this.usersService.findOne(payload.sub);
      return { data };
    } catch {
      throw new BadRequestException('Token invalide');
    }
  }

  async signInWithGoogle(@Req() req: Request, @Res() res: Response): Promise<void> {
    const user = req.user as User;
    const access_token = await this.generateToken(user, '1d');
    return res.redirect(this._frontEndUrl + '/auth/google?access_token' + access_token);
  }

  async profile(@CurrentUser() user: User): Promise<{ data: User }> {
    const { data } = await this.usersService.findOne(user.id);
    return { data };
  }

  async updateProfile(@CurrentUser() currentUser: User, dto: UpdateProfileDto): Promise<{ data: User }> {
    return await this.usersService.updateProfile(currentUser, dto);
  }

  async updatePassword(@CurrentUser() user: User, dto: UpdatePasswordDto): Promise<{ data: User }> {
    try {
      await this.verifyPassword(dto.old_password, user.password);
      await this.usersService.updatePassword(user.id, dto.password);
      return { data: user };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du mot de passe');
    }
  }

  async forgotPassword(dto: forgotPasswordDto): Promise<{ data: User }> {
    try {
      const { data: user } = await this.usersService.findBy('email', dto.email);
      const token = await this.generateToken(user, '15min');
      this.eventEmitter.emit('user.reset-password', { user, token });
      return { data: user };
    } catch {
      throw new BadRequestException('Erreur lors de la réinitialisation du mot de passe');
    }
  }

  async resendToken(email: string): Promise<void> {
    try {
      const { data: user } = await this.usersService.findBy('email', email);
      const token = await this.generateToken(user, '15min');
      this.eventEmitter.emit('user.reset-password', { user, token });
    } catch {
      throw new BadRequestException("Erreur lors de l'envoie du token");
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ data: User }> {
    const { token, password } = resetPasswordDto;
    try {
      const { data } = await this.verifyToken(token);
      await this.usersService.updatePassword(data.id, password);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la réinitialisation du mot de passe');
    }
  }
}