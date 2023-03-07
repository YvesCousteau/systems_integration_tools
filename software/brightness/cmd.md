Disable Wayland
```
sudo nano /etc/gdm3/custom.conf
```
Restart GDM3 to process changes
```
sudo systemctl restart gdm3
```
Change luminosity Now
```
xrandr --output XWAYLAND2 --brightness 0.5
```
