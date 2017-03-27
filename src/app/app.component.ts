import { Component } from '@angular/core';

@Component({
  selector: "my-app",
  template: `
    <h1>{{title}}</h1>
    <sliding-puzzle></sliding-puzzle>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular Sliding Puzzle';
}
