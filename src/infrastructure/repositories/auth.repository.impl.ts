import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/login.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register.dto";
import { User } from "../../domain/entities/user.entity";
import { AuthRepository } from "../../domain/repositories/auth.respository";

export class AuthRepositoryImpl implements AuthRepository {

   constructor(
      private readonly authDatasource: AuthDatasource
   ){}

   login(loginUserDto: LoginUserDto): Promise<User> {
      return this.authDatasource.login(loginUserDto)
   }

   register(registerUserDto: RegisterUserDto): Promise<User> {
      return this.authDatasource.register(registerUserDto)
   }
}