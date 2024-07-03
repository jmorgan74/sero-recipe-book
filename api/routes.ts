import { RecipeController } from "./controller/RecipeController"

export const Routes = [{
    method: "get",
    route: "/api/recipes",
    controller: RecipeController,
    action: "all"
}, {
    method: "get",
    route: "/api/recipes/:id",
    controller: RecipeController,
    action: "one"
}, {
    method: "post",
    route: "/api/recipes",
    controller: RecipeController,
    action: "save"
}, {
    method: "delete",
    route: "/api/recipes/:id",
    controller: RecipeController,
    action: "remove"
}]