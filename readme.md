<h1>TeeBoard video notification</h1>
In development plugin for TeeBoard to allow the user to show an animation in the notification instead of just a slide-in picture. This is seperate from the development of TeeBoard and this is mostly just a project I'm working on my own for my stream.


<h2>How this works</h2>
This plugin uses a video rendered with both RGB and alpha channels into the same video, putting the RGB on top and alpha channels on the bottom. Using these the plugin puts together the appropriate values to create a transparent video to use in the stream. Because of the nature of colours in videos video isn't completely transparent. This is because colour black in a video isn't defined as (0 r, 0 g, 0 b) but (16 r, 16g, 16b), hence the alpha channel translation isn't completely transparent. This is why we include a background to use behind the video to give the video a "canvas" on the screen. 

<h2>Dependencies</h2>
<b>JQuery</b> - </br>
<b>FitText</b> - </br>
<b>Lettering</b> - </br>
<b>Textillate</b> - Allows for the text animation in the notification </br>
