# CAN setup

---

```
sudo ip link set can0 up type can bitrate 1000000
sudo ip link set can1 up type can bitrate 1000000
sudo ifconfig can0 txqueuelen 65536
sudo ifconfig can1 txqueuelen 65536
```

### BaudeRates :
+ 10 Kbit/s
+ 20 Kbit/s
+ 50 Kbit/s
+ 100 Kbit/s
+ 125 Kbit/s
+ 250 Kbit/s
+ 500 Kbit/s
+ 800 Kbit/s
+ 1000 Kbit/s
---
## Tools
Get all can commands with: `sudo apt-get install can-utils`
To print tracefor can0 interface: `candump can0`
To send tram on can1 interface `cansend can1 000#11.22.33.44`
---
## Raspberry Pi
### Enable SPI Interface
`sudo raspi-config` and choose Interfacing Options -> SPI -> Yes  to enable SPI interface
`sudo reboot`
### Load BCM2835
```
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.60.tar.gz
tar zxvf bcm2835-1.60.tar.gz 
cd bcm2835-1.60/
sudo ./configure
sudo make
sudo make check
sudo make install
# For More：http://www.airspayce.com/mikem/bcm2835/
```
### Load wiringPi
```
sudo apt-get install wiringpi
#When used on Raspberry Pi 4B, you may need to upgrade first：
wget https://project-downloads.drogon.net/wiringpi-latest.deb
sudo dpkg -i wiringpi-latest.deb
gpio -v
# Run the command "gpio -v". If the version 2.52 is displayed, the installation is successful
```
### Load Python
```
#python3
sudo apt-get update
sudo apt-get install python3-pip
sudo apt-get install python3-pil
sudo apt-get install python3-numpy
sudo pip3 install RPi.GPIO
sudo pip3 install spidev 
sudo pip3 install python-can
```
### Change Config
`sudo nano /boot/config.txt` 
+ dtparam=spi=on
+ dtoverlay=mcp2515-can1,oscillator=16000000,interrupt=25
+ dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=23
`sudo reboot`
---
## Linux 
Install Driver: https://www.peak-system.com/Drivers.523.0.html?&L=1&gclid=Cj0KCQjwtsCgBhDEARIsAE7RYh22RDKYjfT7nJpCZfoU5HGBl7nSwPSkweqx5PXC1TDpr0IJGxXrLsIaAhQAEALw_wcB
