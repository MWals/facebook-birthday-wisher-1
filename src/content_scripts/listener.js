$(document).ready(function () {

  //Facebook listener (Interval is 5 sec)
  var facebookListener = function () {

    chrome.storage.local.get("facebookBirthdays", function (data) {
      if (typeof data.facebookBirthdays !== 'undefined' && data.facebookBirthdays) {
        if (data.facebookBirthdays.indexOf(new Date().toDateString()) == -1) {
          data.facebookBirthdays.push(new Date().toDateString());
          chrome.storage.local.set({
            'facebookBirthdays': data.facebookBirthdays
          }, function () {
          });
          window.open('https://www.facebook.com/events/birthdays');
        }
      } else {
        chrome.storage.local.set({
          'facebookBirthdays': []
        }, function () {
        });
      }
    });

    if (window.location.href.indexOf('/events/birthdays') != -1) {
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
    }
  };
  setInterval(facebookListener, 5000);
});

