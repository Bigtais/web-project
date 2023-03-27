import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import 'rxjs-compat/add/observable/interval';

@Component({
  selector: 'sd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'This is a testing project, do not expect anything special';
  secondes?: number;
  counterSubscription?: Subscription;

  ngOnInit() {
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log("An error occured : " + error);
      },
      () => {
        console.log("Observalble complete.");
      }
    );
  }

  ngOnDestroy() {
    this.counterSubscription?.unsubscribe();
  }

}
