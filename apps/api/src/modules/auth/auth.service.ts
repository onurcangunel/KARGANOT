import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: { name: string; email: string; password: string }) {
    const user = await this.usersService.create(dto);
    const token = await this.signJwt(user.id, user.email, user.role);
    return { user, token };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Geçersiz kimlik bilgileri');
    const ok = await bcrypt.compare(dto.password, (user as any).password || (user as any).passwordHash || '');
    if (!ok) throw new UnauthorizedException('Geçersiz kimlik bilgileri');
    const token = await this.signJwt(user.id, user.email, (user as any).role || 'STUDENT');
    return { user, token };
  }

  private async signJwt(sub: string, email: string, role: string) {
    const payload = { sub, email, role };
    return this.jwtService.signAsync(payload);
  }
}
