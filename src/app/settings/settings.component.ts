import {Component, OnInit, NgZone} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public facebookBirthdayMessages: Array<String> = [
    'May your birthday be filled with many happy hours and your life with many happy birthdays. HAPPY BIRTHDAY !!',
    'Well, you are another year older and you haven\'t changed a bit. That\'s great because you are perfect just the way you are. Happy Birthday.',
    'Have a wonderful birthday. I wish your every day to be filled with lots of love, laughter, happiness and the warmth of sunshine.',
    'May your coming year surprise you with the happiness of smiles, the feeling of love and so on. I hope you will find plenty of sweet memories to cherish forever. Happy birthday.',
    'On your special day, I wish you good luck. I hope this wonderful day will fill up your heart with joy and blessings. Have a fantastic birthday, celebrate the happiness on every day of your life. Happy Birthday!!',
    'Special day, special person and special celebration. May all your dreams and desires come true in this coming year. Happy birthday.',
    'Soon you’re going to start a new year of your life and I hope this coming year will bring every success you deserve. Happy birthday.',
    'I hope your birthday is going to be a terrific one. Enjoy your day and be happy always. Happy birthday.',
    'On this special day, I wish you all the very best, all the joy you can ever have and may you be blessed abundantly today, tomorrow and the days to come! May you have a fantastic birthday and many more to come... HAPPY BIRTHDAY!!!!',
    'They say you lose your memory as you grow older. I say forget about the past and live life to the fullest today. Start with ice cream. Happy Birthday.',
    'May you create a memory today that becomes your happy place in all the many years yet to come. Happy Birthday.',
    'Live your life sharing the beauty and happiness that you have today and every day. Happy Birthday.',
    'It is not enough to celebrate just one day, so celebrate EVERY day for the rest of your life. But start today. Happy Birthday.'
  ];

  public userBirthdayMessages: Array<String> = this.facebookBirthdayMessages;

  constructor(public zone: NgZone) {
    var that = this;
    chrome.storage.local.get(['userBirthdayMessages'] , (data) => {
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
