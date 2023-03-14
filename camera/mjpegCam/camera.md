# Tips & tricks for v4l2
v4l2 utilities provide the tools to manage USB webcam setting and information. Scripts can be use to make adjustments and run manually or with cron. Running in cron for example to change the exposure settings at certain times of day. The package is available in all Linux distributions and is usually called `v4l-utils`.

+ List of available video devices: `v4l2-ctl --list-devices`.
+ List available control settings: `v4l2-ctl -d /dev/video0 --list-ctrls`.
+ List available video formats: `v4l2-ctl -d /dev/video0 --list-formats-ext`.
+ Read the current setting: `v4l2-ctl -d /dev/video0 --get-ctrl=exposure_auto`.
+ Change the setting value: `v4l2-ctl -d /dev/video0 --set-ctrl=exposure_auto=1`.
---
To create a virtual camera we have to create a virtual device before: `sudo modprobe v4l2loopback video_nr=X`.

Create a virtual Cam used by multi Soft: `sudo gst-launch-1.0 v4l2src device=/dev/video1 ! videoconvert ! videoscale ! video/x-raw,width=800,height=600,framerate=30/1 ! v4l2sink device=/dev/videoX`
+ source: `/dev/video1`
+ link: `/dev/videoX`
---
For pi we use script but for Linux we use µStreamer
---
Exemple of µStreamer:
+ `sudo ustreamer --device=/dev/videoX --host=0.0.0.0 --port=80 --resolution=800x600`
+ `--format`: Available: YUYV, UYVY, RGB565, RGB24, JPEG; default: YUYV.
+ `--resolution`: Initial image resolution. Default: 640x480.
+ `--desired-fps`: Desired FPS. Default: maximum possible.
+ `--quality`: Set quality of JPEG encoding from 1 to 100 (best). Default: 80.
+ `--image-default`: Reset all image settings below to default. Default: no change.
+ `--brightness`: Set brightness. Default: no change.
+ `--contrast`: Set contrast. Default: no change.
+ `--saturation`: Set saturation. Default: no change.
+ `--hue`: Set hue. Default: no change.
+ `--gamma`: Set gamma. Default: no change.
+ `--sharpness`: Set sharpness. Default: no change.
+ `--backlight-compensation`: Set backlight compensation. Default: no change.
+ `--white-balance`: Set white balance. Default: no change.
+ `--gain`: Set gain. Default: no change.
+ `--color-effect`: Set color effect. Default: no change.
+ `--flip-vertical`: Set vertical flip. Default: no change.
+ `--flip-horizontal`: Set horizontal flip. Default: no change.
