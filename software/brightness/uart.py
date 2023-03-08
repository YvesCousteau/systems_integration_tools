import serial
import subprocess

def uart():
    ser = serial.Serial(
        port='/dev/ttyUSB0',
        baudrate = 115200,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=0
    )
    lux = 50
   
    while True:
        lux = ser.readline()
        subprocess.run(["brightness", "-la"])
        ser.flush()

if __name__ == '__main__':
    uart()