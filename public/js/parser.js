var keyList = ['job:', 'school:', 'project:', 'skills:','info:'];

var symbols = [];
symbols['job:'] = ['company:', 'title:', 'date:', 'description:'];
symbols['school:'] = ['name:', 'degree:', 'date:', 'description:'];
symbols['project:'] = ['name:','date:','url:','description:'];
symbols['skills'] = ['description:'];
symbols['info:'] = ['name:', 'phone:', 'email:', 'address:'];

var Parser = function(inp, out) {
	this.input = $(inp);
	this.output = $(out);
}

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};

Parser.prototype.parseKey = function(key, block) {
	var len = symbols[key].length;
	var output_block = "";
	for (var i = 0; i < len; i++) {
		var sym = symbols[key][i];
		var index = block.indexOf(sym);
		if (index != -1) {
			// take the string from the index + sym.length to the indexOf the next '</div>'
			var until = block.indexOf('</div>', index);
			var str = block.substring(index + sym.length, until);
			output_block += "<div class='"+sym+"'>" + str + "</div>";
		}
	}
	return output_block;
}
Parser.prototype.parseBlock = function(block) {
	//parse from 'job:' to the next <div>
	// then from 'dates:' to the next <div> and so on
	for (var i = 0; i < keyList.length; i++) {
		var key = keyList[i];
		if (block.indexOf(key) != -1)
			return "<div class='"+key+"'>" + this.parseKey(keyList[i], block) + '</div>';
	}
}
Parser.prototype.parse = function() {
	var input_html = this.input.html();
	var blocks = [];
	blocks = input_html.split('<div><br></div>');
	var output_html = "";
	for (var i = 0; i < blocks.length; i++) {
		output_html += this.parseBlock(blocks[i]);
	}
	console.log(output_html);
	this.output.html(output_html);
}