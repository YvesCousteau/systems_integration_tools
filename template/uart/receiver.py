# sender.py
import time
import serial
ser = serial.Serial(
  port='/dev/ttyUSB0', # Change this according to connection methods, e.g. /dev/ttyUSB0
  baudrate = 9600,
  parity=serial.PARITY_NONE,
  stopbits=serial.STOPBITS_ONE,
  bytesize=serial.EIGHTBITS
)
while True:
    print(ser.readline())
    ser.flush()