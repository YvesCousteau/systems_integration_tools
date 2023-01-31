# sender.py
import time
import serial
import sys

def sender(msg,stop):
  ser = serial.Serial(
  port='/dev/ttyS0', # Change this according to connection methods, e.g. /dev/ttyUSB0
  baudrate = 115200,
  parity=serial.PARITY_NONE,
  stopbits=serial.STOPBITS_ONE,
  bytesize=serial.EIGHTBITS,
  timeout=1
  )
  while True:
    print(stop)
    if stop:
      return
    else:
      ser.write(msg.encode())
      time.sleep(2)

