import {Component, OnInit, NgZone} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private facebookBirthdayMessages: Array<String> = [];

  private userBirthdayMessages: Array<String> = [];

  constructor(public zone: NgZone) {
    var that = this;
    chrome.storage.local.get(['facebookBirthdayMessages', 'userBirthdayMessages'] , (data) => {
      if (data.facebookBirthdayMessages) {
        this.zone.run(() => {
          that.facebookBirthdayMessages = data.facebookBirthdayMessages;
        });
      }
      if (data.userBirthdayMessages) {
        this.zone.run(() => {
          that.userBirthdayMessages = data.userBirthdayMessages;
        });
      }
    });
  }

  check(message) {
    return this.userBirthdayMessages.includes(message);
  }

  remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  save($event) {
    if ($event.target.checked) {
      this.userBirthdayMessages.push($event.target.value);
    } else {
      this.remove(this.userBirthdayMessages, $event.target.value)
    }
    chrome.storage.local.set({
      'userBirthdayMessages': this.userBirthdayMessages
    });
  }

  ngOnInit() {
  }

}
