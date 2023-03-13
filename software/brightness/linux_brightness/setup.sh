#! /bin/bash
#
# Disable Wayland
# $sudo nano /etc/gdm3/custom.conf
#
# Restart GDM3 to process changes
# sudo systemctl restart gdm3
#
# If you have to give you the right to use TTYUSB : sudo usermod -a -G dialout $USER
#
# Create a command
# chmod +x brightness.sh
# sudo cp brightness.sh /usr/local/bin