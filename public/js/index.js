$(document).ready(function () {
	var parser = new Parser($('#edit'), $('#preview'));
	
	$('#edit').focus();
	// redirect the focus to the edit textbox
	$('#preview').click(function() {
		$('#edit').focus();
	});
	// prevents tabbing away, keycode = 9 = tab key	
	$('#edit').keydown(function(event) {
		var keyCode = event.keyCode || event.which; 
		if (keyCode == 9) {
			event.preventDefault();
		}
	});
	// updates the preview right after the edit box was updated
	$('#edit').keyup(function(event) {
		$('#preview').html($('#edit').html());
		parser.parse();
	});
});