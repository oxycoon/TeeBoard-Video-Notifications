<h1>TeeBoard transparent video notification</h1>
In development plugin for TeeBoard to allow the user to show an animation in the
 notification instead of just a slide-in picture. This is separate from the
 development of TeeBoard and this is mostly just a project I'm working on my
 own for my stream.
 
Don't expect the best code standard for this project, as I'm not too well versed
 in the best practice usage of javascript and html5. Before this I've only done 
 one javascript/html5 project, which I wasn't too happy with. 

This plugin uses a video rendered with both RGB and alpha channels into
<h2>How this works</h2>
 the same video, putting the RGB on top and alpha channels on the bottom.
 Using these the plugin puts together the appropriate values to create a
 transparent video to use in the stream. Because of the nature of colours
 in videos video isn't completely transparent. This is because colour black
 in a video isn't defined as (0 r, 0 g, 0 b) but (16 r, 16g, 16b), hence
 the alpha channel translation isn't completely transparent. This is why
 we include a background to use behind the video to give the video a
 "canvas" on the screen. 

<h2>Video setup</h2>
After making the animation video, make sure there is no background behind
 it. For the sake of these instructions I will be referring to Adobe After
 Effects, as that's the software I used to achieve this. Export the
 animation into two videos formatted for the web (h264/mp4). The first
 video has the RGB output and the other video has the alpha.

Once we have the two videos re-import them into one video with double
 height of the original video. Stack the two videos on top of each
 other with the RGB video on the top, then export this version of the
 video as a web friendly format.

/-----------/</br>
/ -RGB- /</br>
/-----------/</br>
/ Alpha /</br>
/------------/</br>
</br>
Put the final video into the video folder (not included in this project).
 If desired, create an appropriate image background to use as a "canvas"
 to hide the awkward box that appears when the video is run. 

<h2>Dependencies</h2>
<b>JQuery</b> - Used in libraries I use</br>
<b>Textillate</b> - Allows for the text animation in the notification</br>
<b>FitText</b> - Textillate uses this plugin</br>
<b>Lettering</b> - Textillate uses this plugin</br>

<h2>TODO</h2>
<li>Create a dynamic video selector for different notification types (follower, subscriber, donation).</li>
<li>Smooth out the code to be less clunky</li>