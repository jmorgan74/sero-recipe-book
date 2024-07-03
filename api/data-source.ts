import "reflect-metadata"
import { DataSource } from "typeorm"
import { Recipe } from "./entity/Recipe"
import { Ingredient } from "./entity/Ingredient"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "sero-test",
    password: "sero-test",
    database: "sero-recipes",
    synchronize: true,
    logging: false,
    entities: [Recipe, Ingredient],
    migrations: [],
    subscribers: [],
})
