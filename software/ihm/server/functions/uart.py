# sender.py
import time
import serial
import sys
import queue

def sender(queue):
  ser = serial.Serial(
  port='/dev/ttyS0', # Change this according to connection methods, e.g. /dev/ttyUSB0
  baudrate = 115200,
  parity=serial.PARITY_NONE,
  stopbits=serial.STOPBITS_ONE,
  bytesize=serial.EIGHTBITS,
  timeout=1
  )
  while True:
    data = queue.get()
    print("On est laaaa " + data["value"])
    #ser.write(msg.encode())
    time.sleep(1)

