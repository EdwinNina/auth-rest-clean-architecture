import { SignTokenFunction, UserAuthToken } from '../../../interfaces/auth.interface';
import { JwtAdapter, PayloadInt } from '../../../lib/jwt.adapter';
import { RegisterUserDto } from '../../dtos/auth/register.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.respository';

interface RegisterUserUseCase {
   execute(registerUserDto: RegisterUserDto): Promise<UserAuthToken>
}

export class RegisterUser implements RegisterUserUseCase {

   constructor(
      private readonly authRepository: AuthRepository,
      private readonly signToken: SignTokenFunction = JwtAdapter.sign
   ) {}

   async execute(registerUserDto: RegisterUserDto): Promise<UserAuthToken> {
      const { id, name, email } = await this.authRepository.register(registerUserDto)
      const token = await this.signToken({ id })

      if(!token) throw CustomError.internalServerError('Errror generating token')

      return  {
         token,
         user: { id, name, email }
      }
   }
}