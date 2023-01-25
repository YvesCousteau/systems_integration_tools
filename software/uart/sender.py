# sender.py
import time
import serial
ser = serial.Serial(
  port='/dev/ttyS0', # Change this according to connection methods, e.g. /dev/ttyUSB0
  baudrate = 9600,
  parity=serial.PARITY_NONE,
  stopbits=serial.STOPBITS_ONE,
  bytesize=serial.EIGHTBITS,
)
msg = ""
i = 0
while True:
    i+=1
    print(i)
    # 1=>g 3=>f 5=>e 7=>d 9=>c
    #ser.write(('6').encode("ASCII"))
    ser.write(("1").encode())
    time.sleep(2)
