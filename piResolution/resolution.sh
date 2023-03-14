#!/bin/sh

export DISPLAY=:0
width=2560
height=1600
frame=50
cvt=$(cvt $width $height $frame)
name=$(echo "$cvt" | awk '{print $1;}')
xrandr --newmode $cvt
xrandr --addmode HDMI-2 $name
xrandr --output HDMI-2 --mode $name