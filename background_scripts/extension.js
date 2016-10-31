chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': 'https://www.facebook.com/events/birthdays'}, function(tab) {
    // Tab opened.
  });
});