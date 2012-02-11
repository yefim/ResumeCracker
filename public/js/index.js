$(document).ready(function () {
	$('#edit').keypress(function(event) {
		$('#preview').html($('#edit').html());
	});

});