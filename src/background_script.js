var birthdayMessages = [
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
  'It is not enough to celebrate just one day, so celebrate EVERY day for the rest of your life. But start today. Happy Birthday.',
  'May your birthday mark the beginning of a wonderful period of time in your life!',
  'May your special day be filled with tons of Happy moments and beautiful flowers, Good friends and joyful hours! Wishing you a very Happy Birthday!',
  'Wishing you a birthday filled with sweet moments and wonderful memories to cherish always!',
  'A birthday is just the first day of another 365-day journey around the sun. Enjoy the trip... Happy Birthday...',
  'A birthday is one of the most important days of the year- may yours be filled with the light of living and the brightness of laughter. Happy Birthday'
];

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({'url': chrome.extension.getURL('index.html')});
});

// Set default values on Chrome storage on extension installation
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install" || details.reason === "update") {
    chrome.storage.sync.set({
      'facebookBirthdayMessages': birthdayMessages,
      'userBirthdayMessages': birthdayMessages
    });
  }
});

chrome.windows.onCreated.addListener(function () {
  facebookListener();
});

chrome.tabs.onCreated.addListener(function () {

});

chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.message == "wishBirthday") {
      chrome.storage.sync.set({
        'birthdays': null
      }, function() {
        facebookListener();
      });
    }
  });

var facebookListener = function () {

  chrome.storage.sync.get(['birthdays', 'userBirthdayMessages'], function (data) {

    var now = new Date(),
      time = now.getTime(),
      today = now.toDateString();

    if (data.birthdays !== today) {
      chrome.storage.sync.set({
        'birthdays': today,
        'lastWished': time
      }, function () {
        chrome.tabs.create({'url': 'https://www.facebook.com/events/birthdays'}, function (tab) {
          chrome.tabs.executeScript(tab.id, {
            file: 'content_script.js',
            runAt: 'document_end'
          })
        });
      });
    }
  });
};
