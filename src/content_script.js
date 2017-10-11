$(document).ready(function () {

  var wish = function (userBirthdayMessages) {
      var birthdayWishes = $('textarea');
      $.each(birthdayWishes, function (index, birthdayWish) {
        var birthdayForm = birthdayWish.closest('form.uiStreamInlineAction');
        if ($(birthdayWish).val().trim().length == 0) {
          var birthdayMessage = userBirthdayMessages[parseInt(Math.random() * userBirthdayMessages.length)];
          $(birthdayWish).val(birthdayMessage);
          $(birthdayForm).find('input.mentionsHidden').val(birthdayMessage);
          $('body').append('<script>var http = new XMLHttpRequest();var url = "' + birthdayForm.action + '";var params = "' + $(birthdayForm).serialize() + '";http.open("POST", url, true);http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");http.send(params);</script>');
          $(birthdayForm).append('<b style="color: green">Wished</b>');
          $(birthdayWish).attr('disabled', 'true');
        }
      });
    },

    displayMessage = function () {
      if ($('#facebookBirthdayWisher').length == 0) {
        $('#blueBarDOMInspector').append('<table id="facebookBirthdayWisher" width="100%" style="height: 50px; background: black;">' +
          '<tr><td width="25%"></td>' +
          '<td width="50%"><span style="color: white; font-size: 16px"><b>This page has been opened by Facebook Birthday Wisher. Click' +
          ' <a style="color: yellowgreen" target="_blank" href="' + 'chrome-extension://' + chrome.runtime.id + '/index.html#/settings' + '">here</a>' +
          ' for configuration options.</b></span></td>' +
          '<td width="25%"></td>' +
          '</table>');
      }
    },

    //Facebook listener (Interval is 5 sec)
    facebookListener = function () {

      chrome.storage.sync.get(['birthdays', 'userBirthdayMessages'], function (data) {

        var today = new Date().toDateString();

        if (data.birthdays !== today) {
          chrome.storage.sync.set({
            'birthdays': today
          }, function () {
            window.open('https://www.facebook.com/events/birthdays');
          });
        }

        if (window.location.href.indexOf('/events/birthdays') !== -1) {
          wish(data.userBirthdayMessages);
          displayMessage();
        }
      });
    };

  setInterval(facebookListener, 5000);
});

