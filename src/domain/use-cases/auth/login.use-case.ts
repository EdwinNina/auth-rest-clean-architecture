import { SignTokenFunction, UserAuthToken } from '../../../interfaces/auth.interface';
import { JwtAdapter } from '../../../lib/jwt.adapter';
import { LoginUserDto } from '../../dtos/auth/login.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.respository';

interface LoginUserUseCase {
   execute(loginUserDto: LoginUserDto): Promise<UserAuthToken>
}

export class LoginUser implements LoginUserUseCase{

   constructor(
      private readonly authRepository: AuthRepository,
      private readonly signToken: SignTokenFunction = JwtAdapter.sign
   ) {}

   async execute(loginUserDto: LoginUserDto): Promise<UserAuthToken> {
      const { id, name, email } = await this.authRepository.login(loginUserDto)
      const token = await this.signToken({ id })

      if(!token) throw CustomError.internalServerError('Error generating token')

      return {
         token,
         user: {
            id,
            name,
            email
         }
      }
   }
}