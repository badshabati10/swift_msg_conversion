import { Component } from '@angular/core';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { SwiftConversionService } from './swift-conversion.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-swift-conversion',
  templateUrl: './swift-conversion.component.html',
  styleUrls: ['./swift-conversion.component.scss'],
  imports:[MatDatepickerModule,CommonModule],
  standalone: true
})
export class SwiftConversionComponent {
  imsgItems:any[]=[];

  constructor(private swiftCobService:SwiftConversionService){}

  ngOnInit(): void{
    this.getSwiftData();
  };

  getSwiftData(): void {
    this.swiftCobService.getSwiftDataList().subscribe({
      next: (data) => {

        console.log('Test');
        this.imsgItems = data;
      },
      error: (err) => {
        console.error('Error fetching education details:', err);
      }
    });
  }


}
