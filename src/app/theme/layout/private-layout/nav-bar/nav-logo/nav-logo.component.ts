// Angular import
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-nav-logo',
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss']
})
export class NavLogoComponent {
  // public props
  @Input() navCollapsed: boolean;
  @Output() NavCollapse = new EventEmitter();
  windowWidth: number;

  // Constructor
  constructor(private router: Router) {
    this.windowWidth = window.innerWidth;
  }

  // public import
  navCollapse() {
    if (this.windowWidth >= 400) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }
  reload(){
    this.router.navigate(["/"]).then(v => location.reload());
    location.reload();
  }
}
