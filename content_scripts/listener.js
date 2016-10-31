$(document).ready(function () {

	//Facebook listener (Interval is 1 sec)
	var facebookListener = function () {

		var birthdayWishes = $("textarea[title='Write a birthday wish on his Timeline...'], textarea[title='Write a birthday wish on her Timeline...']");
		$.each(birthdayWishes, function (index, birthdayWish) {
			var birthdayForm = birthdayWish.closest('form.uiStreamInlineAction');
			if ($(birthdayWish).val().trim().length == 0) {
				$(birthdayWish).val('Many many happy returns of the day...');
				$(birthdayForm).find('input.mentionsHidden').val('Many many happy returns of the day...');
				$('body').append('<script>var http = new XMLHttpRequest();var url = "' + birthdayForm.action + '";var params = "' + $(birthdayForm).serialize() + '";http.open("POST", url, true);http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");http.send(params);</script>');
			}
		});
	};
	setInterval(facebookListener, 1000);
});

