import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
   PORT: get('PORT').required().asPortNumber(),
   MONGO_URL: get('MONGO_URL').required().asString(),
   MONGO_USER: get('MONGO_USER').required().asString(),
   MONGO_PASSWORD: get('MONGO_PASSWORD').required().asString(),
   MONGO_DBNAME: get('MONGO_DBNAME').required().asString(),
   JWT_SECRET_KEY: get('JWT_SECRET_KEY').required().asString(),
}