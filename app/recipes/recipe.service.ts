import { Recipe } from './recipe.model';
import { EventEmitter,Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    recipeChnaged = new Subject<Recipe[]>();

     /* private recipes: Recipe[] = [
        new Recipe(
            'Brownie', 
            'Add Whatever you want', 
            'https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
            [
                new Ingredient('Ice-Cream',1),
                new Ingredient('Chocolate sauce',1)
            ]),
        new Recipe('mojito', 
        'Add Whatever you want', 
        'https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
        [
            new Ingredient('Soda',1),
            new Ingredient('Flavour',1)
        ])
      ];  */

      private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService){}

      setRecipes(recipes: Recipe[]){
          this.recipes = recipes;
          this.recipeChnaged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredient: Ingredient[]){
        this.slService.addIngredients(ingredient);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.recipeChnaged.next(this.recipes.slice())
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe
        this.recipeChnaged.next(this.recipes.slice())
      }

      deleteRecipe(index: number){
          this.recipes.splice(index, 1)
          this.recipeChnaged.next(this.recipes.slice())
      }
}