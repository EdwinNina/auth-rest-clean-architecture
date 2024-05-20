import jsonwebtoken from 'jsonwebtoken'
import { envs } from "../config"

export interface PayloadInt {
   id: string
}

export class JwtAdapter {

   static async sign(payload: PayloadInt, expiresIn: string = '2h'): Promise<string|null> {
      const secretKey = envs.JWT_SECRET_KEY

      return new Promise(resolve => {
         jsonwebtoken.sign(payload, secretKey, {expiresIn}, (error, token) => {
            if(error) return resolve(null)
            resolve(token!)
         })
      })
   }

   static async verify<T>(token: string): Promise<T|null> {
      const secretKey = envs.JWT_SECRET_KEY
      return new Promise(resolve => {
         jsonwebtoken.verify(token, secretKey, (error, decoded) => {
            if(error) return resolve(null)
            resolve(decoded as T)
         })
      })
   }
}