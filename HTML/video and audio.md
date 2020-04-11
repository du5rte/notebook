# Video and Audio

## Playing Video and Audio Locally
When playing video and audio files locally that come from a remote source, the same-origin policy requires a web server to be running.
http://en.wikipedia.org/wiki/Same-origin_policy

There are many ways to do this on both Mac and PC, but one of the easiest ways is to install an all-in-one application like MAMP.
http://www.mamp.info/en/


## Video
The video element allows webpages to play video files inline with other content.
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video


It either needs controls, autoplay or both
```html
<video src="http://treehouse-code-samples.s3.amazonaws.com/html-video-and-audio/bridge.mp4" type=video/mp4 controls autoplay />
```

## Source
The source element specifies media resources for the <video>, <audio>, and <picture> elements. Useful to have various backup video files.

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source


```html
<video controls>
  <source src="http://treehouse-code-samples.s3.amazonaws.com/html-video-and-audio/bridge.mp4">
  <source src="http://treehouse-code-samples.s3.amazonaws.com/html-video-and-audio/bridge.ogg">
</video>
```


## Audio
The audio element allows webpages to play sound content.
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

```html
<audio src="http://treehouse-code-samples.s3.amazonaws.com/html-video-and-audio/bridge-audio.mp3" type=audio/mp3 controls />
<!-- or -->
<audio controls>
	<source src="http://treehouse-code-samples.s3.amazonaws.com/html-video-and-audio/bridge-audio.mp3" type=audio/mp3  />
</audio>
```


## Creating Media
Videos need to be compressed as much for web use, Bitrate, Frame rate and Resolution need to be looked at.
Most popular compression choices:
H.264 + mp3 (MP4) and Theora + Vorbis (OGG)

http://www.videolan.org/vlc/index.html
http://www.adobe.com/products/mediaencoder.html

## Create a Caption File 
It's always a good idea to caption videos, whether it's for people with hearing impairments, people that are in a public space and don't have headphones with them, or for people that just can't quite understand what you're saying. Even if there's no spoken text in a video, it's still nice to point out sound effects and music, or even highlight the absence of sound.

SRT and WebVTT are popular formats but .vtt is more web friendly

https://quuz.org/webvtt/

## Track
The track element specifies timed text data for video and audio media.
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track

```html
<video>
	<track label="English" kind="subtitles" srclang="en" src="bridge-captions.vtt" default>
</video>
```

## Video Players
An HTML video player is just a collection of CSS and JavaScript that wraps around the standard video and audio elements to make working with them a bit easier.

https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
http://praegnanz.de/html5video/

## MediaElement.js
How to add it to our project:
http://mediaelementjs.com/

```html
<!--- Top of the Page--->
<head>
	<script src="mejs/jquery.js"></script>
	<script src="mejs/mediaelement-and-player.min.js"></script>
	<link rel="stylesheet" href="mejs/mediaelementplayer.min.css" />
	<link rel="stylesheet" href="mejs/mejs-skins.css">
</head>
<!--- Skins, -ted -wmp --->
<video class="mejs-ted" width="852" height="480" controls> </video>
<!--- Bottom of the Page --->
<script>
	$('audio,video').mediaelementplayer({
		success: function(player, node) {
			$('#' + node.id + '-mode').html('mode: ' + player.pluginType);
		},
		startLanguage: 'en',
		translationSelector: true
	});
</script>
```
	
## Creating a Custom Skin

```html
<head>
	<link rel="stylesheet" href="css/mejs-customskin.css">
</head>

<video class="mejs-customskin"></video>
<audio class="mejs-customskin"></audio>
<!--- We can then overwrite the styles --->
<style>
	.mejs-treehouse .mejs-crontrols {
		background: rbga(56,64,71,0.98);
		height: 30px;
	}
</style>
<!--- We can choose what features we want --->
<script>
	$('audio,video').mediaelementplayer({
		success: function(player, node) {
			$('#' + node.id + '-mode').html('mode: ' + player.pluginType);
		},
		features: ['playpause', 'tracks', 'progress'],
		startLanguage: 'en',
		translationSelector: true
	});
</script>
```