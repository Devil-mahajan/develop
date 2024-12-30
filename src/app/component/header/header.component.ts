import { Component ,Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentTab = 'health-it';
  @Output() toggleCahnge = new EventEmitter<string>();

  toggleBtn(newValue: string): void {
    console.log(`Toggle changed to: ${newValue}`);
    this.toggleCahnge.emit(newValue);
  }

}
