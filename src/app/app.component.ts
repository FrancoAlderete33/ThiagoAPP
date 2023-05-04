import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ThiagoAPP';

  hideFooter = false;

  toggleFooter() {
    this.hideFooter = !this.hideFooter;
  }
}
