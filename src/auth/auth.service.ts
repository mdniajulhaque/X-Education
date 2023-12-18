import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAdminInput } from './dto/login-admin.input';
import { CreateAdminInput } from 'src/users/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try{
    const user = await this.usersService.findOneUser(email);
    const valid = user && (await bcrypt.compare(password, user?.password));

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }catch(error)
  {
    throw new InternalServerErrorException("User Validation Failed" + error);
  }
  }

  async loginAdmin(loginAdminInput: LoginAdminInput) {
    try{
    const adminInfo = await this.usersService.findOneUser(loginAdminInput.email);

    return {
      access_token: this.jwtService.sign({
        email: adminInfo.email,
        role: adminInfo.role,
        userId:adminInfo._id
      }),
      user: adminInfo,
    };
  }catch(error)
  {
    throw new InternalServerErrorException("Admin Login Failed" + error);
  }
  }


  async createAdmin(createAdminInput: CreateAdminInput) {
    try{

    return await this.usersService.createAdmin(createAdminInput)
    }catch(error)
    {
      throw new InternalServerErrorException("Admin Creation Failed" + error);
      
    }
  }

}
