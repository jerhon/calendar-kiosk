import { Component } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private broadcastService: BroadcastService, 
    private msalService: MsalService) { }

  ngOnInit() {
    var subscription = this.broadcastService.subscribe("msal:acquireTokenFailure", () => {
      this.msalService.loginRedirect();
    });
  }
}
