import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../lib/jwt.adapter";
import { UserModel } from "../../data";

export class AuthMiddleware {

   static async validateJwt(req: Request, res: Response, next: NextFunction) {
      const authorization: string|undefined = req.header('Authorization');

      if(!authorization) return res.status(401).json({ error: 'No token provided' });
      if(!authorization.startsWith('Bearer')) return res.status(401).json({ error: 'Invalid bearer token'})

      const token: string = authorization.split(' ').at(1)!

      try {
         const payload = await JwtAdapter.verify<{id: string}>(token)
         if(!payload) return res.status(401).json({ error: 'Invalid token' })

         const user = await UserModel.findById(payload.id).select('name email')
         if(!user) return res.status(404).json({ error: 'User not found' }) 

         req.body.user = user
      } catch (error) {
         console.log(error)
         res.status(500).json({ error: 'Internal Server Error' })
      }
      next()
   }
}