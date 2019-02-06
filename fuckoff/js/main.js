const firstFuckoff = 1;
const lastFuckoff = 2;

const allFonts = [
	"Arial", "Calibri", "Century Gothic", "Comic Sans", "Consolas", "Courier", "Dejavu Sans", "Dejavu Serif",
	"Georgia", "Gill Sans", "Helvetica", "Impact", "Lucida Sans", "Myriad Pro", "Open Sans", "Palatino",
	"Tahoma", "Times New Roman", "Trebuchet", "Verdana", "Zapfino",

	"Fahkwang", "Indie Flower", "Lato", "Major Mono Display", "Merriweather", "Montserrat", "Noto Serif", "Noto Serif SC",
	"Open Sans", "Oswald", "Playfair Display", "Raleway", "Roboto", "Source Sans Pro", "Staatliches", "ZCOOL KuaiLe"
];
let fonts = ["serif", "sans-serif", "monospace"];
allFonts.forEach(function(font){
	const obs = new FontFaceObserver(font);
	obs.load().then(function(){
		fonts.push(font);
	}, function(){
		console.log(`Font ${font} is not available.`);
	});
})
const sizeMin = 20;
const sizeMax = 60;

const fuckOffs = ["fuckoff", "Fuck Off", "FUCK OFF", "fUCk oFF"];

// to stop fucking off, call unfuck()
let doFuck = true;
function fuck(){
	doFuck = true;
	const fo = $("#fuckoff"+firstFuckoff)[0];
	const res = fo.play();
	res.catch(function(ex){
		if(ex.name==="NotAllowedError"){
			fo.play();
			return;
		}
		console.error(ex.name+":"+ex.message);
	});
}
function unfuck(){
	doFuck = false;
}

function randBetween(start, fin){
	// [start,fin)
	return start+(fin-start)*Math.random();
}

function randColor(){
	const hue = Math.floor(Math.random()*360);
	const saturation = Math.round(randBetween(50, 100));
	const lumination = Math.round(randBetween(30, 100));
	const alpha = randBetween(0.7, 1);
	return `hsla(${hue}, ${saturation}%, ${lumination}%, ${alpha})`;
}

const canvas = {};
canvas.writeFuck = function(message){
	const fontSize = Math.round(randBetween(sizeMin, sizeMax), 0);
	const font = fonts[Math.floor(Math.random()*fonts.length)];
	this.ctx.font = `${fontSize}px "${font}"`;
	const textWidth = this.ctx.measureText(message).width;
	const textHeight = getTextHeight(this.ctx.font).height;
	const maxX = this.$.width()-textWidth;
	const maxY = this.$.height()-textHeight;
	const x =  randBetween(0,maxX);
	const y = randBetween(0,maxY);
	const gradient = this.ctx.createLinearGradient(x, y, textWidth, textHeight);
	gradient.addColorStop(0, randColor());
	gradient.addColorStop(1, randColor());

	this.ctx.fillStyle = gradient;
	this.ctx.fillText(message, x, y+textHeight);
}

const numFuckoff = lastFuckoff-firstFuckoff+1;
for(let i=firstFuckoff; i<=lastFuckoff; i++){
	$("#fuckoff"+i).bind("ended", function(){
		console.log("Done fucked off "+i);
		if(!doFuck) return;
		const nextFuck = ((i-firstFuckoff)+1)%numFuckoff + firstFuckoff;
		console.log("Gonna fuck "+nextFuck);
		$("#fuckoff"+nextFuck)[0].play();
	});
	$("#fuckoff"+i).bind("play", function(){
		canvas.writeFuck(fuckOffs[Math.floor(Math.random()*fuckOffs.length)]);
	});
}

function fitCanvas(){
	// need to change html attr cuz css attr will make image scaled
	canvas.html.height=window.innerHeight-1;
	canvas.html.width=window.innerWidth-1;
	canvas.writeFuck("press F to toggle fucking off");
	canvas.writeFuck("press C to clear screen");
	canvas.writeFuck("fuck you if you're on mobile");
}
$(window).ready(function(){
	canvas.$ = $("#mainCanvas");
	canvas.html = canvas.$[0];
	canvas.ctx = canvas.html.getContext("2d");
	fitCanvas();
	$(window).resize(fitCanvas);
	$("#fuckoff1").bind("canplay", fuck);
	// some browser doesnt allow autoplay
	setTimeout(function(){
		if(!doFuck) fuck();
	}, 1000);
	setTimeout(function(){
		if(!doFuck) fuck();
	}, 2000);
});

/**
 * https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
 * Daniel Earwicker <https://stackoverflow.com/users/27423/daniel-earwicker>
 **/
function getTextHeight(font) {
  const text = $('<span>Hg</span>').css({
  	font: font
  });
  const block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');
  const div = $('<div></div>');
  div.append(text, block);
  const body = $('body');
  body.append(div);
  const result = {};
  try {
    block.css({ verticalAlign: 'baseline' });
    result.ascent = block.offset().top - text.offset().top;
    block.css({ verticalAlign: 'bottom' });
    result.height = block.offset().top - text.offset().top;
    result.descent = result.height - result.ascent;
  } finally {
    div.remove();
  }
  return result;
};

$(document).keypress(function(e){
	if(e.key === "f" || e.key === "F"){
		if(doFuck){
			unfuck();
		} else {
			fuck();
		}
	} else if(e.key === "c" || e.key === "C"){
		canvas.ctx.fillStyle = "#000000";
		canvas.ctx.fillRect(0, 0, canvas.html.width, canvas.html.height);
	}
});