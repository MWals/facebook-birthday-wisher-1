var wish = function(birthdayMessage) {
  var birthdayWishes = $("textarea[title='Write a birthday wish on his Timeline...'], textarea[title='Write a birthday wish on her Timeline...']");
  $.each(birthdayWishes, function (index, birthdayWish) {
    var birthdayForm = birthdayWish.closest('form.uiStreamInlineAction');
    if ($(birthdayWish).val().trim().length == 0) {
      $(birthdayWish).val(birthdayMessage);
      $(birthdayForm).find('input.mentionsHidden').val(birthdayMessage);
      $('body').append('<script>var http = new XMLHttpRequest();var url = "' + birthdayForm.action + '";var params = "' + $(birthdayForm).serialize() + '";http.open("POST", url, true);http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");http.send(params);</script>');
      $(birthdayForm).append('<b style="color: green">Wished</b>');
      $(birthdayWish).attr('disabled', 'true');
    }
  });
};
