#! /usr/bin/env bash
# Brightness Change for Linux with xrandr (X11)

if [[ $# -eq 0 ]] ; then
    echo 'No brightness change'
    exit 1
fi

if [[ "$1" -gt 100 ]] || [[ "$1" -lt 10 ]]
then
    echo "Brightness must be between 10 - 100"
    exit 1
fi

screen=$(xrandr | grep " connected" | cut -f1 -d " " | tail -1)

if [[ -z "$screen" ]]
then
    echo "No screen Found"
    exit 1
fi
echo "Brightness change for $1% on $screen"

value=$(bc -l <<< 'scale=2;'$1'/100')

xrandr --output $screen --brightness $value