import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedBtn: string = '';
  onToggleChange(event: string) {
    this.selectedBtn = event;
    console.log("appcompoennt", this.selectedBtn);

  }
}
