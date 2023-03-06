# SETUP SCRIPT RASPBERRY
---
```
sudo apt install git npm unclutter
npm install 
pip3 install eventlet python-socketio
git clone https://github.com/YvesCousteau/systems_integration_tools.git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 16
```
---
## Local Socketio
```
cd systems_integration_tools/software/weSocketIO_Local/client_JS/
npm i
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```
Initialize
+ @lxpanel --profile LXDE-pi
+ @pcmanfm --desktop --profile LXDE-pi
+ @xscreensaver -no-splash
Python server
+ @python3 /home/pi/systems_integration_tools/software/webSocketIO_Local/server.py &
React client
+ @npm start --prefix /home/pi/systems_integration_tools/software/webSocketIO_Local/client_JS &
\n Chromium FullScreen \n
+ @xset s off
+ @xset -dpms
+ @xset s noblank
+ @chromium-browser --kiosk http://localhost:3000
---