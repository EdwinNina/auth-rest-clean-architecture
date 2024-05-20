import { envs } from "./config/envs"
import { MongoDatabase } from "./data"
import { AppRoutes } from "./presentation/routes"
import { AppServer } from "./presentation/server"

(() => {
   main()
})()

async function main() {
   await MongoDatabase.connect({
      dbName: envs.MONGO_DBNAME,
      mongoUrl: envs.MONGO_URL
   })

   new AppServer({
      port: envs.PORT,
      routes: AppRoutes.routes
   }).start()
}