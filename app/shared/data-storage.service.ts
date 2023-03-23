import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.servivce';

@Injectable({providedIn: 'root'})
export class DataStorageservice {

    constructor(private http: HttpClient, 
        private recipeService: RecipeService, 
        private authService: AuthService){
        
    }
        
    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://hello-231819.firebaseio.com/recipes.json',recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){
            return this.http.get<Recipe[]>('https://hello-231819.firebaseio.com/recipes.json')
        .pipe(
        map(recipes =>{
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));     
    }
}