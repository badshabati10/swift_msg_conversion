import {Component, HostListener} from '@angular/core';
import {AuthenticationService} from '../_services';
import noticeboardData from 'src/assets/data/noticeboard-data.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  username: any;
  notices: any[] = noticeboardData;
  isExpanded: boolean[] = [];
  maxLength: number = 120;
  hasAccessControl = false;
  hasOperation = false;
  hasCoreConfig = false;
  hasBiome:boolean=false;
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.isExpanded = new Array(this.notices.length).fill(false);
    this.authService.user.subscribe(u => {
      console.log(u?.modules);
      u?.modules.toString().split(',').forEach(module => {
        if(module.split('!')[0] === 'CCONF'){
          this.hasCoreConfig = true;
        }else if(module.split('!')[0] === 'OPERATION'){
          this.hasOperation = true;
        }else if(module.split('!')[0] === 'ACCESS_CTRL'){
          this.hasAccessControl = true;
        }else if(module.split('!')[0] === 'BIOME'){
          this.hasBiome = true;
        }
      })
      this.username = u?.fullName;
    });
  }

  toggleText(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    window.location.reload();
  }

  routing(path) {
    this.router.navigate([path]).then(v => location.reload());
  }

}
