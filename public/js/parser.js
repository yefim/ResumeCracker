var symbols = [];
symbols[0] = '>';
symbols[1] = '*';
symbols[2] = '';

var Parser = function(inp, out) {
	this.input = $(inp);
	this.output = $(out);
}

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};

Parser.prototype.parse = function() {
	var str = this.input.html().replaceAll(' ', ',');
	this.output.html(str);
}