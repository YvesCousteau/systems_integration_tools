#!/usr/bin/env python3
# coding: utf-8

import time
import os
# import picamera
from omxplayer.player import OMXPlayer

from mqttdaemon import MqttUniqueValue
from device import Device

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
    self.stop_video()

    self.stop_camera()

    self.debug('Deleting brightness_layer')
    del self.brightness_layer

    super().destroy()

  def _init_child(self):
    super()._init_child()

    self.brightness_layer = BrightnessLayer(0x00, 5)
    self.debug(f'Creating brightness_layer at 5')

    self.camera = None

    self.vplayer = None

  def init_config(self):
    self.filenames = []

    super().init_config()

    self.directory = self.config.get(self.name, 'directory', fallback=None)
    if self.directory != None:
      self.debug(f'  directory: {self.directory}')
    else:
      self.error('No directory found')

    for i in range(0, 6):
      self.filenames.append(self.config.get(self.name, f'filename{i+1}', fallback=f'video{i+1}.mp4'))
      self.debug(f'  filename{i+1} => {self.filenames[i]}')

    self.width = int(self.config.get(self.name, 'width', fallback=self.WIDTH))
    self.debug(f'  width: {self.width}')

    self.height = int(self.config.get(self.name, 'height', fallback=self.HEIGHT))
    self.debug(f'  height: {self.height}')

    self.cam_rotate = int(self.config.get(self.name, 'cam_rotate', fallback=self.CAM_ROTATE))
    self.debug(f'  cam_rotate: {self.cam_rotate}')

    self.cam_hflip = self.config.getboolean(self.name, 'cam_hflip', fallback=self.CAM_HFLIP)
    self.debug(f'  cam_hflip: {self.cam_hflip}')

    self.cam_vflip = self.config.getboolean(self.name, 'cam_vflip', fallback=self.CAM_VFLIP)
    self.debug(f'  cam_vflip: {self.cam_vflip}')

    cam_crop = self.config.get(self.name, 'cam_crop', fallback=self.CAM_CROP)
    self.cam_crop = []
    for v in cam_crop.split(','):
      self.cam_crop.append(float(v))
    self.debug(f'  cam_crop: {self.cam_crop}')

    #self.vplayer_args = f'--no-osd --no-keys --loop --layer 1 --win "0 0 {self.width} {self.height}"'
    self.vplayer_args = f'--no-osd --no-keys --loop --layer 1 --win "0 0 1440 2880" --orientation 90'

  def mqtt_connect(self): 
    for key in self.MQTT_TO_EMIRROR: 
      self.mqttclient.subscribe(key) 
      self.debug(f'Subsribe mqtt topic "{key}"')

  def mqtt_message(self, client, message): 
    if message.topic == 'Emirror_Cmd/Emirror_Brightness':
      value = int(255 - (float(message.payload) * 255 / 100))
      self.debug(f'Updating brightness to 0x{value:2x}') 
      self.brightness_layer.update(value)
      return

    if message.topic == 'Emirror_Cmd/Emirror_ImageSource':
      value = int(message.payload)
      if value == 0:
        self.debug(f'ImageSource to off')
        self.stop_video()
        self.stop_camera()
      elif value == 7:
        self.debug(f'ImageSource to camera')
        self.stop_video()
        self.start_camera()
      elif value < 7:
        self.debug(f'ImageSource to video{value}')
        self.stop_camera()
        self.play_video(value)
      return

  # def start_camera(self):
  #   self.stop_camera()
  #   self.camera = picamera.PiCamera()
  #   self.camera.rotation = 90
  #   self.camera.vflip = True
  #   self.camera.hflip = False
  #   self.camera.crop = self.cam_crop
  #   self.camera.start_preview()

  # def stop_camera(self):
  #   if self.camera != None:
  #     self.debug('Closing camera')
  #     self.camera.close()
  #   self.camera = None
  
  def play_video(self, video):
    self.stop_video()
    self.debug(self.filenames[video-1])
    self.vplayer = OMXPlayer(os.path.join(self.directory, self.filenames[video-1]), args=self.vplayer_args)

  def stop_video(self):
    if self.vplayer != None:
      self.debug('Stoping video player')
      self.vplayer.quit()
    self.vplayer = None

  def do_loop(self):
    pass
    
# ============================================================================== 

if __name__ == '__main__':
  em = EMirror()
  del em
