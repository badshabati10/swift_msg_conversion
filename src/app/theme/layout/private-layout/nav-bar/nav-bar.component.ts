// Angular import
import { Component, EventEmitter, Output } from '@angular/core';
import { BaseConfig } from '../../../../app-config';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  // public props
  @Output() NavCollapse = new EventEmitter();
 
  navCollapsed;
  windowWidth: number;


  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 400 ? BaseConfig.isCollapse_menu : false;
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 400) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

 
}
