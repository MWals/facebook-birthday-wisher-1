$(document).ready(function () {

  //Facebook listener (Interval is 5 sec)
  var facebookListener = function () {

    chrome.storage.local.get(resources, function (data) {

      var wishBirthday = false,
        storageData = {};

      if (data.facebookBirthdays) {
        if (data.facebookBirthdays.indexOf(new Date().toDateString()) == -1) {
          data.facebookBirthdays.push(new Date().toDateString());
          wishBirthday = true;
          storageData['facebookBirthdays'] = data.facebookBirthdays;
        }
      } else {
        storageData['facebookBirthdays'] = [];
      }

      if (data.userBirthdayMessages) {
        if (window.location.href.indexOf('/events/birthdays') != -1) {
          wish(data.userBirthdayMessages[parseInt(Math.random() * data.userBirthdayMessages.length)]);
        }
      } else {
        storageData['facebookBirthdayMessages'] = birthdayMessages;
        storageData['userBirthdayMessages'] = birthdayMessages;
      }

      if (Object.keys(storageData).length > 0) {
        chrome.storage.local.set(storageData, function () {
          if (wishBirthday) {
            window.open('https://www.facebook.com/events/birthdays');
          }
        });
      }
    });
  };

  setInterval(facebookListener, 5000);
});

