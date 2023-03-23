import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.servivce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService){

  }

  ngOnInit(){
    this.authService.autoLogin();
  }
  /* title(title: any) {
    throw new Error("Method not implemented.");
  } */
  /* loadedFeature = 'recipe';

  onNavigate(feature: string){
    this.loadedFeature = feature; 
  } */
}