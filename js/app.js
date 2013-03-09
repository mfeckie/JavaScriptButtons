
$('.modal').on('hide', function () {
	var data = {},
		modal = $(this),
		example = modal.closest('.example'),
		code = example.find('code'),
		tryit = example.find('.tryit'),
		inputs = modal.find('.modal-body :input'),
		input, merchant, el, len, i;

	// Build a map out of the form inputs
	for (i = 0, len = inputs.length; i < len; i++) {
		input = $(inputs[i]);

		data[input.attr('name')] = {
			value: input.val()
		};
	}

	// Create a script tag to use as the HTML
	el = document.createElement('script');

	if (data.button && data.button.value === 'cart') {
		el.src = 'paypal-button-minicart.js?merchant=' + data.business.value;
	} else {
		el.src = 'paypal-button.js?merchant=' + data.business.value;
	}

	for (key in data) {
		if (key !== 'business') {
			el.setAttribute('data-' + key, data[key].value);
		}
	}

	code.text(el.outerHTML.replace(/data-/g, "\n    data-").replace("></" + "script>", "\n></" + "script>"));

	// Update the button
	tryit.empty();
	PAYPAL.apps.ButtonFactory.create(data.business.value, data, data.button, tryit[0]);
});
