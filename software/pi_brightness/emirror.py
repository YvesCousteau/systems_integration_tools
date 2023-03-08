#!/usr/bin/env python3
# coding: utf-8

from brightness_layer import BrightnessLayer

class EMirror(Device):

  # ImageSource 0 "Off" 1 "Video 1" 2 "Video 2" 3 "Video 3" 4 "Video 4" 5 "Video 5" 6 "Video 6" 7 "Live camera"

  MQTT_TO_EMIRROR = [
    'Emirror_Cmd/Emirror_ImageSource',
    'Emirror_Cmd/Emirror_Brightness'
  ]

  WIDTH = 1920
  HEIGHT = 1080
  CAM_ROTATE = 0
  CAM_VFLIP = False
  CAM_HFLIP = False
  CAM_CROP = '0.0,0.0,1.0,1.0'

  def destroy(self):
    self.debug('Deleting brightness_layer')
    del self.brightness_layer

    super().destroy()

  def _init_child(self):
    super()._init_child()

    self.brightness_layer = BrightnessLayer(0x00, 5)
    self.debug(f'Creating brightness_layer at 5')

    self.camera = None

    self.vplayer = None

  def do_loop(self):
    pass
    
# ============================================================================== 

if __name__ == '__main__':
  em = EMirror()
  del em
