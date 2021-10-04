import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { fadeAnimation } from './app.animations'
import { ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation] // register the animation
})

export class AppComponent {
}