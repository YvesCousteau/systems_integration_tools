import serial
import subprocess
import time

def uart():
    ser = serial.Serial(
        port='/dev/ttyUSB0',
        baudrate = 9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=0
    )
   
    while True:
        lux = ser.readline().decode().rstrip()
        print(lux)
        subprocess.run(["brightness.sh", lux])
        ser.flush()
        time.sleep(10)

if __name__ == '__main__':
    uart()