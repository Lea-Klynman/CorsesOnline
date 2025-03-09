import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-applayout',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './applayout.component.html',
  styleUrl: './applayout.component.css'
})
export class ApplayoutComponent {

}
