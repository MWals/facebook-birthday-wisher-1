$(document).ready(function () {

  var getBirthdayMessage = function () {

    var birthdayMessages = [
      'May your birthday be filled with many happy hours and your life with many happy birthdays. HAPPY BIRTHDAY !!',
      'Many many happy returns of the day...',
      'Well, you are another year older and you haven\'t changed a bit. That\'s great because you are perfect just the way you are. Happy Birthday.'
    ];
    return birthdayMessages[parseInt(Math.random() * birthdayMessages.length)];
  };

  //Facebook listener (Interval is 5 sec)
  var facebookListener = function () {

    chrome.storage.local.get("facebookBirthdays", function (data) {
      if (typeof data.facebookBirthdays !== 'undefined' && data.facebookBirthdays) {
        if (data.facebookBirthdays.indexOf(new Date().toDateString()) == -1) {

          if (!localStorage.lastOpened || (new Date().getTime() - localStorage.lastOpened >= 3600000)) {
            window.open('https://www.facebook.com/events/birthdays');
            localStorage.lastOpened = new Date().getTime();
          }

          if (window.location.href === 'https://www.facebook.com/events/birthdays') {
            var birthdayWishes = $("textarea[title='Write a birthday wish on his Timeline...'], textarea[title='Write a birthday wish on her Timeline...']");
            $.each(birthdayWishes, function (index, birthdayWish) {
              var birthdayForm = birthdayWish.closest('form.uiStreamInlineAction');
              if ($(birthdayWish).val().trim().length == 0) {
                var birthdayMessage = getBirthdayMessage();
                $(birthdayWish).val(birthdayMessage);
                $(birthdayForm).find('input.mentionsHidden').val(birthdayMessage);
                $('body').append('<script>var http = new XMLHttpRequest();var url = "' + birthdayForm.action + '";var params = "' + $(birthdayForm).serialize() + '";http.open("POST", url, true);http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");http.send(params);</script>');
                $(birthdayForm).append('<b style="color: green">Wished</b>');
                $(birthdayWish).attr('disabled', 'true');
              }
            });
            data.facebookBirthdays.push(new Date().toDateString());
            chrome.storage.local.set({
              'facebookBirthdays': data.facebookBirthdays
            }, function () {
            });
          }
        }
      } else {
        chrome.storage.local.set({
          'facebookBirthdays': []
        }, function () {
        });
      }
    });
  };
  setInterval(facebookListener, 5000);
});

