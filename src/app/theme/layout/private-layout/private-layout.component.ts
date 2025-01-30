// Angular import
import { Component, NgZone } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

// Project import
import { BaseConfig } from '../../../app-config';

@Component({
  selector: 'app-admin',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent {
  // public props
  baseConfig;
  navCollapsed: boolean;
  windowWidth: number;

  // Constructor
  constructor(
    private zone: NgZone,
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
    this.baseConfig = BaseConfig;

    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    if (current_url === baseHref + '/layout/theme-compact' || current_url === baseHref + '/layout/box') {
      this.baseConfig.isCollapse_menu = true;
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 400 ? BaseConfig.isCollapse_menu : true;
  }

  // public method
 
}
