import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register.dto";
import { AuthRepository } from "../../domain/repositories/auth.respository";
import { CustomError } from "../../domain/errors/custom.error";
import { RegisterUser } from "../../domain/use-cases/auth/register.use-case";
import { LoginUserDto } from "../../domain/dtos/auth/login.dto";
import { LoginUser } from "../../domain/use-cases/auth/login.use-case";

export class AuthController {

   constructor(
      private readonly authRepository: AuthRepository
   ) {}

   private handleError = (error: unknown, res: Response) => {
      if(error instanceof CustomError) {
         return res.status(error.statusCode).json({ error: error.message })
      }
      return res.status(500).json({ error: 'Internal Server Error' })
   }

   register = async (req: Request, res: Response) => {
      const [error, registerUserDto] = RegisterUserDto.create(req.body)
      if(error) return res.status(400).json({ error })

      new RegisterUser(this.authRepository)
         .execute(registerUserDto!)
         .then(data => res.json(data))
         .catch(error => this.handleError(error, res))
   }

   login = async (req: Request, res: Response) => {
      const [error, loginUserDto] = LoginUserDto.create(req.body)
      if(error) return res.status(400).json({ error })

      new LoginUser(this.authRepository)
         .execute(loginUserDto!)
         .then(data => res.json(data)) 
         .catch(error => this.handleError(error, res))
   }
}