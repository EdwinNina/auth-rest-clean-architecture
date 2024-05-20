import { UserModel } from "../../data";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/login.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register.dto";
import { User } from '../../domain/entities/user.entity';
import { CustomError } from "../../domain/errors/custom.error";
import { BcryptAdapter } from "../../lib/bcrypt.adapter";
import { UserMapper } from "../mappers/user.mapper";

export class AuthDatasourceImpl implements AuthDatasource {

   async login(loginUserDto: LoginUserDto): Promise<User> {
      const {email, password} = loginUserDto

      try {
         const user = await UserModel.findOne({ email })

         if (!user) throw CustomError.forbidden('Email is incorrect')

         if(!BcryptAdapter.comparePassword(user.password, password))
            throw CustomError.forbidden('Password is incorrect')

         return UserMapper.userEntityFromObject(user)
      } catch (error) {
         if(error instanceof CustomError) {
            throw error
         }
         throw CustomError.internalServerError()
      }
   }

   async register(registerUserDto: RegisterUserDto): Promise<User> {
      const {name, email, password} = registerUserDto

      try {
         const user = await UserModel.findOne({ email })

         if(user) throw CustomError.badRequest('User already registered');

         const newUser = await UserModel.create({
            name,
            email,
            password: BcryptAdapter.hashPassword(password)
         })

         await newUser.save()

         return UserMapper.userEntityFromObject(newUser);
      } catch (error) {
         if(error instanceof CustomError) {
            throw error
         }
         throw CustomError.internalServerError()
      }
   }
}