import {Component, OnInit, NgZone} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedIn: boolean = true;

  public lastWished: number;

  constructor(public zone: NgZone) {
    var that = this;
    chrome.identity.getProfileUserInfo(function (userInfo) {
      if (userInfo.email.trim().length == 0) {
        that.zone.run(() => {
          that.loggedIn = false;
        });
      }
    });
    chrome.storage.sync.get(['lastWished'], (data) => {
      that.zone.run(() => {
        that.lastWished = data.lastWished;
      });
    });
  }

  ngOnInit() {

  }

}
