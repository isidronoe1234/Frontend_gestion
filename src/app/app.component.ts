import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto_gestion';

  constructor(private router:Router){}


  isSideNavCollapsed=false;
  screenWidth=0;


  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth= data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }

  isExcludedRoute(): boolean {
    const currentRoute = this.router.url; 
    return currentRoute === '/home-principal'; 
  }
}
