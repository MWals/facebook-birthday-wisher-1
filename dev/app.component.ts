import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>Facebook Birthday Wisher</h1>
        <a target="_blank" href="https://www.facebook.com/events/birthdays"><button>Wish Birthdays</button></a>
    `,
})
export class AppComponent {

}