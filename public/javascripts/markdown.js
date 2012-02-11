$(function(){
  var keyList = ['job', 'school', 'project', 'skills','info'];
  var $edit = $("#edit"), $preview = $("#preview"), $info = $preview.find(".info"),
      $jobs = $preview.find(".jobs"), $education = $preview.find(".education"),
      $projects = $preview.find(".projects"), $skills = $preview.find(".skills");

  var symbols = [
    ['job',['title', 'company', 'date', 'description'], $jobs],
    ['school',['location', 'name', 'date', 'degree', 'description'], $education],
    ['project',['name','date','url','description'], $projects],
    ['skill',['description'], $skills],
    ['info',['name', 'phone', 'email', 'address'], $info]
  ];
  $edit.keyup(function(){
    $info.empty();
    $jobs.empty();
    $education.empty();
    $projects.empty();
    $skills.empty();

    var content = $edit.html(), blocks = content.split("<div><br></div>");
    for(var i = 0; i < blocks.length; i++){
      var b = blocks[i].replace(/(<div>)|(<\/div><div>)|(<\/div>)/g, "<br>");
      b = b.replace(/^(<br>)|(<br>$)/g,"");
      b = b.split("<br>");

      for(var j = 0; j < symbols.length; j++){
        if(symbols[j][0] === b[0].substr(0, b[0].length - 1)){
          var symbol = symbols[j], $container = symbol[2];
          $container = $("<div class=\""+symbol[0]+"\"></div>").appendTo($container);
          for(var k = 0; k < symbol[1].length; k++){
            for(var l = 1; l < b.length; l++){
              if(symbol[1][k] === b[l].substr(0,symbol[1][k].length)){
                $("<div class=\"" + symbol[1][k] + "\">" + b[l].substr(symbol[1][k].length + 1, b[l].length) + "</div>").appendTo($container);
              }
            }
          }
        }
      }
    }

    for(var i = 0; i < symbols.length; i++){
      if(symbols[i][2].children().length > 0){
        symbols[i][2].parent().show();
      }
      else{
        symbols[i][2].parent().hide();
      }
    }
  });

  //dialog for syntax info
  $('#dialog').dialog({
    modal: true,
    autoOpen: false,
    closeText: 'close',
    title: 'Sample Syntax',
    width: 550
  });
});
