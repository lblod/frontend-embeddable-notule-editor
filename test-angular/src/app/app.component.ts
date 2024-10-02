import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SayEditor } from './sayEditor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SayEditor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angbeddable';
}
