// relative paths to notification images
var imgFollow = "images/notification-bg-follow.png";
var imgSub = "images/notification-bg-sub.png";
var imgDonate = "images/notification-bg-donate.png";

//Relative paths to notification videos
var videoFollow = "videos/FollowerAlert_High.mp4";
var videoSub = "";
var videoDonate = "videos/FollowerAlert_High.mp4";

var videoChanged = false;

/**
 *	Delay before the text starts animating
 *	@const 
 */
var TEXTILLATION_INITIAL_DELAY = 2200;

/**
 *	The timing when the textillation is to start
 *	the fading animation.
 *	@const 
 */
var TEXTILLATION_HALFWAY_DELAY = 3115;

/**
 *	Length of the video used in the animation.
 *	@const 
 */
var TEXTILLATION_VIDEO_LENGTH = 7000;

/**
 *	Output canvas to draw the video on.
 */
var outputCanvas;

/**
 *	Output canvas context.
 */
var	outputContext;

/**
 *	Buffer canvas used to draw the images for the output on.
 */
var	bufferCanvas;

/**
 *	Buffer canvas context.
 */
var	bufferContext;

/**
 *	Active video
 */
var	video;

/**
 *	Output video width. 
 *	@type {number}
 */
var	width;

/**
 *	Output video height. 
 *	@type {number}
 */
var	height;

/**
 *	Interval object which triggers the updating of the canvas
 *	related to the video. 
 */
var	interval;

/**
 *	Time between updates, 1 / fps * 1000 
 *	@type {number}
 */
var updateFrequency = 33;

$('document').ready(function(){
	prepareVideo();
	prepareText(35);
});

/**
 *	Prepares the video and video listener for processing. 
 */
function prepareVideo() {
	outputCanvas = document.getElementById('output');
	outputContext = outputCanvas.getContext('2d');
	bufferCanvas = document.getElementById('buffer');
	bufferContext = bufferCanvas.getContext('2d');
	video = document.getElementById('video');
	width = outputCanvas.width;
	height = outputCanvas.height;
	
	video.addEventListener('play', function(){
		clearInterval(interval);
		interval = setInterval(processFrame, updateFrequency);
	});
	
	video.addEventListener('ended', function(){
		video.load();
		hideNotification();
	});
}

/**
 *	Selects the video for the animation.
 *	@param {string} type The type of notification to display. 
 *	@return {int} status Tells whether or not the selection is successful
 */
function selectVideo(type){
	if(type == "donation"){
		if(videoDonate != ""){
			video.src = videoDonate;
		}
		else{
			return 0;
		}
	}
	else if(type == "follower"){
		if(videoFollow != ""){
			video.src = videoFollow;
		}
		else{
			return 0;
		}
	}
	else if(type == "subscriber"){
		if(videoSub != ""){
			video.src == videoSub;
		}
		else{
			return 0;
		}
	}
	return 1;
}


/**
 *	Sets the settings for the text animation. 
 *	@param {string} type The type of notification to display. 
 *	@param {number} length The number of characters in the message. 
 */
 function prepareText(type, length){
 
	if(type == "follower"){
		var outDelay = TEXTILLATION_VIDEO_LENGTH - TEXTILLATION_INITIAL_DELAY 
						- TEXTILLATION_HALFWAY_DELAY - length * 35;
	 
		$('.notification-msg').textillate({
			initialDelay: TEXTILLATION_INITIAL_DELAY, 
			autoStart: false,
			in:	{
				effect: 'fadeInLeft',
				delayScale: 1.5,
				delay: 10,
				sync: false,
				shuffle: false,
				reverse: false,
				callback: function() {
					setTimeout(function() {
						$('.notification-msg').textillate('out');
					}, outDelay);
				}
			},
			out: {
				effect: 'fadeOutLeft',
				delayScale: 1.5,
				delay: 10,
				sync: false,
				shuffle: false,
				reverse: true
			},
			type: 'char',
			
			//callback: hideNotification
		});
	}
}

/**
 *	Processes each frame for the animation.  
 */
function processFrame() {
	bufferContext.drawImage(video, 0, 0);
	
	var frame = bufferContext.getImageData(0, 0, width, height),
	frameData = frame.data;
	alphaData = bufferContext.getImageData(0, height, width, height).data;
	
	for(var i = 3, length = frameData.length; i < length; i +=4) {
		var r = alphaData[i-3];
		var g = alphaData[i-2];
		var b = alphaData[i-1];
	
		//The "blackest" colour in the video is 16,16,16, which is the alpha for our system
		//turn the colour to 0,0,0 to turn the alpha completely black. 
		if(r == 16 && g == 16 && b == 16){
			frameData[i] = 0;
		}
		else{
			frameData[i] = alphaData[i-1];
		}
	}
	outputContext.putImageData(frame, 0, 0, 0, 0, width, height);
}

/**
 *	Runs the notification animation. Teeboard function. 
 *
 *	@param {string} type The type of notification to display. 
 *	@param {string} msg The message to display in the notification.
 */
function teeboardNotification(type, msg) {
	outputCanvas.display = 'block';
	
	if(selectVideo(type) > 0){
		video.play();
	}

	prepareText(msg.length);
	$('.notification-msg').find('.texts li:first').text(msg);
	$('.notification-msg').textillate('start');
	
	// animate everything onto the screen
	var div = document.getElementById("notification");
	div.style.visibility = "visible";
	TweenLite.killTweensOf(div);
	// tween x position from offscreen (0 - width of image) to 0
	TweenLite.fromTo(div, 0.6, {x:-2020}, {x:0, onComplete:foo});//hideNotification});
}

/**
 *	Empty function
 */
function foo(){}

function hideNotification() {
	// animate everything back off screen
	var div = document.getElementById("notification");
	// tween x position from 0 to (0 - width of image)
	TweenLite.to(div, 0.6, {x:-2020, delay:0});
	
}
