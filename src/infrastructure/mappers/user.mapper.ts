import { User } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class UserMapper {
   static userEntityFromObject(data: {[key: string]: any}): User {
      const { id, _id, name, email, password, roles, img } = data

      if(!_id || !id) throw CustomError.badRequest('Missing id')
      if(!name) throw CustomError.badRequest('Missing name')
      if(!email) throw CustomError.badRequest('Missing email')
      if(!password) throw CustomError.badRequest('Missing password')
      if(!roles) throw CustomError.badRequest('Missing roles')

      return new User(
         id || _id, name, email, password, roles
      )
   }
}