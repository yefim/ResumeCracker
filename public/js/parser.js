var keyList = [];
keyList[0] = 'job:';
keyList[1] = '';

var symbols = [];
symbols['job:'] = [];
symbols['job:'][0] = 'company:';
symbols['job:'][1] = 'title:';
symbols['job:'][2] = 'date:';
symbols['job:'][3] = 'description:';

var Parser = function(inp, out) {
	this.input = $(inp);
	this.output = $(out);
}

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};

Parser.prototype.parseKey = function(key, block) {
	var len = symbols[key].length;
	for (var i = 0; i < len; i++) {
		var sym = symbols[key][i];
		var index = block.indexOf(sym);
		if (index != -1) {
			var str = block.substring(index + sym.length).replace('</div>','');
			console.log(str);
		}
	}
}
Parser.prototype.parseBlock = function(block) {
	//parse from 'job:' to the next <div>
	// then from 'dates:' to the next <div> and so on
	for (var i = 0; i < keyList.length; i++) {
		if (block.indexOf(keyList[i]) != -1)
			this.parseKey(keyList[i], block);
	}
}
Parser.prototype.parse = function() {
	var input_html = this.input.html();
	var blocks = [];
	blocks = input_html.split('<div><br></div>');
	var output_html = "";
	for (var i = 0; i < blocks.length; i++) {
		this.parseBlock(blocks[i]);
	}
	this.output.html(output_html);
}