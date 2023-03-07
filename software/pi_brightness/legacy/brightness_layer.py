import os
import ctypes as ct
import weakref

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))

_lib = ct.CDLL(os.path.join(SCRIPT_DIR, 'libs', 'brightness.so'))

class BrightnessLayer(ct.Structure):
  _fields_ = [
    ('layer', ct.c_int32),
    ('bgLayer', ct.c_int32),
    ('resource', ct.c_uint32),
    ('bgResource', ct.c_uint32),
    ('element', ct.c_uint32),
    ('bgElement', ct.c_uint32),
    ('display', ct.c_uint32)
  ]

  def __init__(self, alpha=0xFF, layer=5, bg_layer=1, display=0):
    _lib.initBrightnessLayer(self, alpha, layer, bg_layer, display)

  def __del__(self):
    _lib.destroyBrightnessLayer(self)

  def update(self, alpha=0xFF):
    _lib.updateBrightnessLayer(self, alpha)

_lib.initBrightnessLayer.argtypes = [ct.POINTER(BrightnessLayer), ct.c_uint8, ct.c_int32, ct.c_int32]
_lib.initBrightnessLayer.restype = None

_lib.updateBrightnessLayer.argtypes = [ct.POINTER(BrightnessLayer), ct.c_uint8]
_lib.updateBrightnessLayer.restype = None

_lib.destroyBrightnessLayer.argtypes = [ct.POINTER(BrightnessLayer)]
_lib.destroyBrightnessLayer.restype = None

# ==============================================================================

if __name__ == '__main__':
  import time

  br = BrightnessLayer()
  time.sleep(1)
  br.update(0xAA)
  time.sleep(2)
  br.update(0xBB)
  time.sleep(2)
  br.update(0xCC)
  time.sleep(2)
  br.update(0xDD)
  time.sleep(2)
  br.update(0xEE)
  time.sleep(2)
  br.update(0xFF)
  time.sleep(2)
