#! /usr/bin/env bash
# Brightness Change for Linux with xrandr (X11)
echo "$1"

if [[ "$1" -gt 99 ]] || [[ "$1" -lt 10 ]]
then
    echo "Brightness must be between 10 - 100"
    exit 1
fi

screen=$(xrandr | grep " connected" | cut -f1 -d " " | tail -1)
currentbrightness=$(xrandr --verbose | grep -i brightness | cut -f2 -d ' ' | head -n1)

#currentbrightness="."+$currentbrightness
currentbrightness=$(bc -l <<< 'scale=2;'$currentbrightness'*100')
currentbrightness=$( printf "%.0f" $currentbrightness )
echo "$currentbrightness"
echo "$screen"
while [ $1 != $currentbrightness ]
do
    if [[ $1 -gt $currentbrightness ]]
    then
        currentbrightness=$(($currentbrightness+1))
    else
        currentbrightness=$(($currentbrightness-1))
    fi
    value=$(bc -l <<< 'scale=2;'$currentbrightness'/100')
    xrandr --output $screen --brightness $value
done
