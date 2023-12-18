import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginAdminInput } from './dto/login-admin.input';
import { CreateAdminInput } from 'src/users/dto';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(email);
    const valid = user && (await bcrypt.compare(password, user?.password));

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async loginAdmin(loginAdminInput: LoginAdminInput) {
    const adminInfo = await this.usersService.findOneUser(loginAdminInput.email);

    return {
      access_token: this.jwtService.sign({
        email: adminInfo.email,
        role: adminInfo.role,
      }),
      user: adminInfo,
    };
  }


  async createAdmin(createAdminInput: CreateAdminInput) {
   return await this.usersService.createAdmin(createAdminInput)
  }

}
