importScripts("https://cdn.jsdelivr.net/npm/node-forge@0.7.0/dist/forge.min.js");

function log(msg){
	console.log(msg);
	postMessage(msg);
}

var md = forge.md.sha512.create();

md.update('ggnore');
var dig = md.digest().toHex();

var showEvery = 8192;

var start=new Date().getTime();
var end=0;
var dur=0;
var i=0;
for(;; ++i){
	dig += i;
	md.update(dig);
	dig = md.digest().toHex();
	if(i%showEvery==0){
		end = new Date().getTime();
		dur = end-start
		log("Ran "+i+ " tests, time = "+dur + "ms.");
		if(dur>5000) break;
	}
}

var hps = i/(dur/1000);
log("Ran " + i + " tests in " + dur + "ms.<br>" + hps + " HPS");