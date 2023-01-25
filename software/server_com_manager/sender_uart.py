# sender.py
import time
import serial
import sys
ser = serial.Serial(
  port='/dev/ttyS0', # Change this according to connection methods, e.g. /dev/ttyUSB0
  baudrate = 115200,
  parity=serial.PARITY_NONE,
  stopbits=serial.STOPBITS_ONE,
  bytesize=serial.EIGHTBITS,
  timeout=1
)
msg = ""
i = 0
while True:
    i+=1
    print("Counter {} - from Raspberry Pi".format(i))
    ser.write(sys.argv[0].encode())
    time.sleep(2)