$(function(){
  $('.green').click(function() {
    var $preview = $('#preview');
    $('body').fadeOut(1000, function() {
      $(this).empty();
      $(this).append($preview);
      $(this).fadeIn(1000);
    });
  });
});