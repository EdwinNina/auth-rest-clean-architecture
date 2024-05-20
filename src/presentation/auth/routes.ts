import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";
import { AuthDatasourceImpl } from "../../infrastructure/datasources/auth.datasource.impl";


export class AuthRoutes {

   static get routes(): Router {
      const router = Router()
      const datasource = new AuthDatasourceImpl()
      const authRepository = new AuthRepositoryImpl(datasource)
      const controller = new AuthController(authRepository)

      router.post('/register', controller.register)
      router.post('/login', controller.login)

      return router
   }
}