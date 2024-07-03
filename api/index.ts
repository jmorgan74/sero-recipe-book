import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { Routes } from "./routes";
import { AppDataSource } from "./data-source";
import { Seeder } from "./seeder";
import { Ingredient } from "./entity/Ingredient";
import { Recipe } from "./entity/Recipe";

const app = express();

export class Application {
  constructor() {
    this.setupApplicationSettings();
    this.setupControllers();
  }

  setupApplicationSettings() {
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  listen() {
    app.listen(3080, () => console.log("Listening on port 3080"));
  }

  async seed() {
    const entities = AppDataSource.entityMetadatas;

    for await (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);

      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
      );
    }

    const recipeRepository = AppDataSource.getRepository(Recipe);
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

    const seeder = new Seeder(recipeRepository, ingredientRepository);

    await seeder.createRecipeSeedData();
  }

  setupControllers() {
    Routes.forEach(route => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
          const result = (new (route.controller as any))[route.action](req, res, next)
          if (result instanceof Promise) {
              result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

          } else if (result !== null && result !== undefined) {
              res.json(result)
          }
      })
    })
  }
}

AppDataSource.initialize().then(async () => {
  const application = new Application();

  application.listen();

  if(process.env.NODE_ENV != 'prod') {
    application.seed();
  }
})