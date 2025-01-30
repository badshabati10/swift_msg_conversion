import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuSearchFormComponent} from "./menu-search-form/menu-search-form.component";
import {MenuDetailsFormComponent} from "./menu-details-form/menu-details-form.component";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MenuMaintenanceService} from "./menu-maintenance.service";
import {MenuInit} from "./menu-init";
import {AlertService} from "../../../_services/alert-service";
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu-maintenance.component.html',
  styleUrls: ['./menu-maintenance.component.scss'],
  standalone: true,
  imports: [
    CommonModule, TranslateModule,
    MenuSearchFormComponent, MenuDetailsFormComponent, MatStepperModule,MatDialogModule
  ]
})
export class MenuMaintenanceComponent implements OnInit {

  @ViewChild('stepper', {read: MatStepper}) stepper: MatStepper;
  @ViewChild(MenuDetailsFormComponent) menuDetailsComponent: MenuDetailsFormComponent;
  @ViewChild(MenuSearchFormComponent) menuSearchFormComponent: MenuSearchFormComponent;
  menuInit: MenuInit;

  constructor(private menuMaintenanceService: MenuMaintenanceService, private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  menuDetails($event) {
    this.menuInit = $event;
    const payload = {'funcCode': this.menuInit?.funcCode, 'menuId': this.menuInit.menuId};
    this.menuMaintenanceService.menuVerification(payload).subscribe({
      next: (response) => {
        this.menuDetailsComponent.fetchMenuDetails(response, this.menuInit);
        this.stepper.next();
      },
      error: (err) => {
          this.alertService.warningAlert(err.error.message);
      }
    });
  }

  onCancelEvent(){
    this.menuSearchFormComponent.onCancel();
    this.stepper.reset();
  }


}

