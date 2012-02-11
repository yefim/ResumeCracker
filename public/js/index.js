var currentRow = 0;

$(document).ready(function () {
	var parser = new Parser($('#edit'), $('#preview'));
	
	// fixes the padding spillover
	$('.textdiv').css('height', '-=100px');
	
	$('#edit').focus();
	// redirect the focus to the edit textbox
	$('#preview').click(function() {
		$('#edit').focus();
	});
	$('div.subtext').click(function() {
		$('#edit').focus();	
	});
	
	// prevents tabbing away
	$('#edit').keydown(function(event) {
		var keyCode = event.keyCode || event.which; 
		//tab key
		if (keyCode == 9) {
			event.preventDefault();
		}
	});
	// updates the preview right after the edit box was updated
	$('#edit').keyup(function(event) {
		// clear edit box if only a single <br> exists in it
		if ($('#edit').html() == '<br>') {
			$('#edit').html('');
		}
		$('#preview').html($('#edit').html());
		parser.parse();
	});
});