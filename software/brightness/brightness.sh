#! /bin/bash
# Brightness Change for Linux with xrandr (X11)
if [[ $1 -gt 1.0 ]] || [[$1 -lt 0.1 ]]
then
    echo "Brightness must be between 0.1 - 1.0"
    exit 1
fi

SCREEN = xrandr | grep " connected" | cut -f1 -d "" | tail -1
if [[ -z "$SCREEN" ]]
then
    echo "No SCREEN Found"
    exit 1
fi
echo "An expected brightness change of `expr $1 / 100`% for the $SCREEN"

xrandr --output $SCREEN --brightness $1