# sender.py
import time
import serial
ser = serial.Serial(
  port='/dev/ttyUSB0', # Change this according to connection methods, e.g. /dev/ttyUSB0
  baudrate = 115200,
  parity=serial.PARITY_NONE,
  stopbits=serial.STOPBITS_ONE,
  bytesize=serial.EIGHTBITS,
  timeout=0
)
while True:
    # print(ser.readlines())
    print(ser.read(3))
    time.sleep(2)