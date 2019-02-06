// JavaScript Document

var isOn = false;
var vid;
var aud;

$(document).ready(function(e) {
	vid = $("#jebvid")[0];
	aud = $("#jebaud")[0];
	
	vid.ontimeupdate = function(){
		if(vid.currentTime > 368/25){
			console.log(vid.currentTime);
			vid.currentTime = 313/25;
			console.log(vid.currentTime);
		}
	};
	aud.ended = function(){
		stopJebVid();
	};
	
	var rBlink = false;
	var respect = $(".respect");
	function doRBlink(){
		rBlink=!rBlink;
		if(rBlink){
			respect.css("visibility","visible");
		} else {
			respect.css("visibility","hidden");
		}
	}
	setInterval(doRBlink,400);
	
	function jumpStart(){
		isOn = true;
		$("#jebvid").css("visibility","visible");
		vid.currentTime = 217/25;
		aud.currentTime = 217/25;
		vid.play();
		aud.play();
	}
	//jumpStart();
	
    $(this).keydown(function(e){
		if(e.keyCode == 70){
			fPressed();
		}
	});
});


	function fPressed(){
		isOn=!isOn;
		if(isOn){
			startJebVid();
		} else {
			stopJebVid();
		}
	}
	function jebPressed(){
		if(!isOn){
			isOn = true;
			startJebVid();
		}
	}
	function notJebPressed(){
		if(isOn){
			isOn = false;
			stopJebVid();
		}
	}
	function startJebVid(){
		$("#jebvid").css("visibility","visible");
		$("#check").attr("src","img/check2.png");
		vid.currentTime = 0;
		aud.currentTime = 0;
		vid.play();
		aud.play();
	}
	function stopJebVid(){
		$("#jebvid").css("visibility","hidden");
				$("#check").attr("src","img/check.png");
		vid.pause();
		aud.pause();
		vid.currentTime = 0;
		aud.currentTime = 0;
	}