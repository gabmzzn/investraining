import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { fadeAnimation } from './app.animations'
import { ViewEncapsulation } from '@angular/core'
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation] // register the animation
})

export class AppComponent {

  constructor(private appService: AppService) { }

  get isLoadingGlobal() {
    return this.appService.isLoading
  }

  // ngOnInit() {
  //   this.isLoading = this.isLoadingGlobal
  //   let sI = setInterval(() => {
  //     this.isLoading = this.isLoadingGlobal
  //   }, 1);
  // }

  // isLoading = this.isLoadingGlobal

}