import serial
import subprocess
import time
import os
def uart():
    ser = serial.Serial(
        port='/dev/ttyUSB0',
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
        print(lux)
        subprocess.run([os.path.dirname(__file__)+"/brightness.sh", lux])
        ser.flush()
        time.sleep(0.5)

if __name__ == '__main__':
    uart()