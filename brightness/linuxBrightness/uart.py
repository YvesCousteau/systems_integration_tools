import serial
import subprocess
import time
import os
import sys
def uart():
    ser = serial.Serial(
        port='/dev/'+sys.argv[1],
        baudrate = 115200,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=0
    )
    print(os.path.dirname(__file__))
    while True:
        lux = ser.readline().decode().rstrip()
        # lux = ser.readline()
        if lux != "":
                print(lux)
                #subprocess.run([os.path.dirname(__file__)+"/brightness.sh", lux])
                subprocess.run([sys.argv[2]+"/brightness.sh", lux])
        ser.flush()
        time.sleep(0.5)

if __name__ == '__main__':
    uart()
