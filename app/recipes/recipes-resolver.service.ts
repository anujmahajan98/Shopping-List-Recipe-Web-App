import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageservice } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
//import { resolve } from 'dns';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageservice, private recipeService: RecipeService){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipes()
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }
        else{
            return recipes;
        }
            
    }

}