#!/bin/sh

export DISPLAY=:0
xrandr --newmode "2560x1600_50.00"  286.00  2560 2744 3016 3472  1600 1603 1609 1649 -hsync +vsync
xrandr --addmode HDMI-2 2560x1600_50.00
xrandr --output HDMI-2 --mode 2560x1600_50.00
xrandr --addmode HDMI-1 2560x1600_50.00
xrandr --output HDMI-1 --mode 2560x1600_50.00