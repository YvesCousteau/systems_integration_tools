import os
import threading
import time
import can
# DEFINE ID
PID_REQUEST         = 0x7DF
PID_REPLY           = 0x7E8
ENGINE_COOLANT_TEMP = 0x05
ENGINE_RPM          = 0x0C
VEHICLE_SPEED       = 0x0D
MAF_SENSOR          = 0x10
O2_VOLTAGE          = 0x14
THROTTLE            = 0x11
# EXEC A LOOP TO RECEIVE COOLANT TEMP
def can_rx_task(can0):
    while True:
        message = can0.recv()
        if message.arbitration_id == PID_REPLY and message.data[2] == ENGINE_COOLANT_TEMP:
            c = '{0:f} {1:x} {2:x} '.format(message.timestamp, message.arbitration_id, message.dlc)
            s=''
            for i in range(message.dlc ):
                s +=  '{0:x} '.format(message.data[i])
            temperature = message.data[3] - 40			#Convert data into temperature in degree C
            print('\r {}  Coolant temp = {} degree C  '.format(c+s,temperature))
        else :
            print("No COOLANT TEMP")



# SETUP CAN INTERFACE
os.system('sudo ip link set can0 type can bitrate 100000')
os.system('sudo ifconfig can0 up')
try:
    can0 = can.interface.Bus(channel = 'can0', bustype = 'socketcan')
except OSError:
    print('Cannot find PiCAN board.')
    exit()
# THREADING TO RECEIVE COOLANT TEMP
threading.Thread(target=can_rx_task(can0)).start()
# EXEC A LOOP TO ASK COOLANT TEMP
try:
    while True:
        # Sent a engine coolant temperature request
        msg = can.Message(is_extended_id=False,arbitration_id=PID_REQUEST,data=[0x02,0x01,ENGINE_COOLANT_TEMP,0x00,0x00,0x00,0x00,0x00],extended_id=False)
        can0.send(msg)
        time.sleep(0.1)
except KeyboardInterrupt:
    #Catch keyboard interrupt
    os.system('sudo ifconfig can0 down')
    print('\n\rKeyboard interrtupt')


