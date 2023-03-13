sudo gst-launch-1.0 v4l2src device=/dev/video1 ! v4l2sink device=/dev/video40

+ source = /dev/video1
+ link = /dev/video40