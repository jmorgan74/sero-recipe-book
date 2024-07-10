import "reflect-metadata"
import { DataSource } from "typeorm"
import { Recipe } from "./entity/Recipe"
import { Ingredient } from "./entity/Ingredient"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Recipe, Ingredient],
    migrations: [],
    subscribers: [],
})
