#!/bin/bash
trap break INT
while :
do
	ffplay -fflags nobuffer -flags low_delay -framedrop -i -fs /dev/video0
done
echo "I have broken out of the interminably long for loop"
trap - INT
sleep 1
echo "END."

# make startup application obs-studio --startvirtualcam