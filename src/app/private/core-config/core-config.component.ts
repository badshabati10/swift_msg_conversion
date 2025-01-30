import { CommonModule } from '@angular/common';
import {Component, ElementRef, OnDestroy} from '@angular/core';
import { TabsModule } from 'src/app/theme/shared/components/tabs/tabs.module';

@Component({
  selector: 'app-operations',
  templateUrl: './core-config.component.html',
  standalone:true,
  imports:[
    CommonModule,  
    TabsModule,
  ],
  styleUrls: ['./core-config.component.scss']
})
export class CoreConfigComponent implements OnDestroy{
  constructor(private elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
}
