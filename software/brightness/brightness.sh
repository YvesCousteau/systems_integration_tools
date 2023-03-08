#! /bin/Bash
# Brightness Change for Linux with xrandr (X11)
if [[ $1 -gt 100 ]] || [[$1 -lt 1 ]]
then
    echo "Brightness must be between 1 - 100"
    exit 1
fi

SCREEN = xrandr | grep " connected" | cut -f1 -d "" | tail -1
echo "$SCREEN"

if [[ -z "$SCREEN" ]]
then
    echo "No SCREEN Found"
    exit 1
fi
echo "An expected brightness change of $1% for the $SCREEN"

xrandr --output $SCREEN --brightness `expr $1 / 100`