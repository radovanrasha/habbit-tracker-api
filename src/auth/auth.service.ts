import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      return { username: user.username };
    }
    return null;
  }

  async login(request: any) {
    const { username, email, password } = request;

    if (!username && !email) {
      throw new BadRequestException(
        'Either username or email must be provided',
      );
    }

    if (!password) {
      throw new BadRequestException('Password must be provided');
    }

    const user = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      username,
      email,
      sub: user._id.toString(),
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
