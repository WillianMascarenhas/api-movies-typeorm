import { DataSource, DataSourceOptions } from "typeorm"
import path from "path"
import "dotenv/config"
import { AppError } from "./erros"


const DataSourceConfig = ():DataSourceOptions => {

    const entitiesPath = path.join(__dirname, "entities/**.{js,ts}")
    const migrationsPath = path.join(__dirname, "migrations/**.{js,ts}")

    if(!process.env.DATABASE_URL){
        throw new AppError("Database URL is missing", 500)
    }

    if(process.env.NODE_ENV == "test"){
        return{
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath]
        }
    }

    return {
        type: "postgres",
        url: process.env.DATABASE_URL!,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    }
}

const AppDataSource: DataSource = new DataSource(DataSourceConfig())

export { AppDataSource }