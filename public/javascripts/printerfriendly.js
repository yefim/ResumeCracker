$(function(){
  $('.green').click(function() {
    var $right = $('#rightColumn');
	$('body').fadeOut(1000, function() {
      $(this).empty();
	  $(this).append($right);
	  $('.subtext').remove();
      $(this).fadeIn(1000);
	  $right.css('width', '100%');
	});
  });
});