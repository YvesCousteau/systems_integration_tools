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

# -- INFO ---
# install obs-studio / v4l2loopback-dkms
# modprobe v4l2loopback
# startup application obs-studio --startvirtualcam
# startup application this script