import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TabsProvider {

  private active_tab: any;

  constructor() {
    this.active_tab = null;
  }

  setActiveTab(val) {
    this.active_tab = val;
  }

  getActiveTab() {
    return this.active_tab;
  }

}
