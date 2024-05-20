import {genSaltSync, hashSync, compareSync} from 'bcrypt'

export class BcryptAdapter {

   static hashPassword(password: string): string {
      const salt = genSaltSync()
      return hashSync(password, salt)
   }

   static comparePassword(passwordHashed: string, password: string): boolean {
      return compareSync(password, passwordHashed)
   }
}