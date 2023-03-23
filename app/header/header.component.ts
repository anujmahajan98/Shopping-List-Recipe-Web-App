import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageservice } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.servivce';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  //styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageservice: DataStorageservice, private authService: AuthService) {
    
  }

ngOnInit(){
  this.userSub = this.authService.user.subscribe(user =>{
    this.isAuthenticated = !!user // equals to ternary operation !user ? false : true;
  });
}

  onSaveData(){
    this.dataStorageservice.storeRecipes();
  }

  onFetchData(){
    this.dataStorageservice.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
