import { User } from "../entities/user.entity";
import { RegisterUserDto } from '../dtos/auth/register.dto';
import { LoginUserDto } from "../dtos/auth/login.dto";

export abstract class AuthRepository {
   abstract login(loginUserDto: LoginUserDto): Promise<User>
   abstract register(registerUserDto: RegisterUserDto): Promise<User>
}