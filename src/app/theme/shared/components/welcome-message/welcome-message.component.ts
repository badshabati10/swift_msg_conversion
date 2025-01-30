import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss']
})
export class WelcomeMessageComponent {
  username: any;
  loginTime: any;
  constructor(private authService : AuthenticationService,
    public traslate : TranslateService){

  }

  ngOnInit(){
    this.authService.user.subscribe(u=>{
      this.username = u.fullName;
      // console.log(u.loginTimeSuc);
      this.loginTime = u.loginTimeSuc;
    })
  }
}
