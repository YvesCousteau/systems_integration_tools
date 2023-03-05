import eventlet
import socketio
import os
# import Pi.GPIO as GPIO
# import can

sio = socketio.Server(cors_allowed_origins='*', logger=False, engineio_logger=False)
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on('speed::subscribe')
def joinRoomSpeed(sid):
    sio.enter_room(sid, "speed")

@sio.event
def disconnect(sid):
    sio.leave_room(sid, "speed")
    print('disconnect ', sid)

# -------------------------------------------------------------------------------------------------------
def uart():
    ser = serial.Serial(
        port='/dev/ttyUSB0',
        baudrate = 115200,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=0
    )
    speed = 0
   
    while True:
        speed = ser.readline()
        sio.emit("speed::update", speed, room="speed")
        sio.sleep(1)

def test():
    speed = 0
   
    while True:
        speed += 1
        sio.emit("speed::update", speed, room="speed")
        sio.sleep(0.05)

# -------------------------------------------------------------------------------------------------------
# def canFct():
#     led = 22
#     GPIO.setmode(GPIO.BCM)
#     GPIO.setwarnings(False)
#     GPIO.setup(led,GPIO.OUT)
#     GPIO.output(led,True)
#
#     ENGINE_COOLANT_TEMP = 0x05
#     ENGINE_RPM          = 0x0C
#     VEHICLE_SPEED       = 0x0D
#     MAF_SENSOR          = 0x10
#     O2_VOLTAGE          = 0x14
#     THROTTLE            = 0x11
#
#     PID_REQUEST         = 0x7DF
#     PID_REPLY           = 0x7E8
#
#     try:
#         bus = can.interface.Bus(channel='can0', bustype='socketcan_native')
#     except OSError:
#         print('Cannot find PiCAN board.')
#         GPIO.output(led,False)
#         exit()
#     threading.Thread(target=can_rx_task).start()
#     try:
#         while True:
#             GPIO.output(led,True)	
#
#             # Sent a engine coolant temperature request
#             msg = can.Message(arbitration_id=PID_REQUEST,data=[0x02,0x01,ENGINE_COOLANT_TEMP,0x00,0x00,0x00,0x00,0x00],extended_id=False)
#             bus.send(msg)
#
#             time.sleep(0.1)
#             GPIO.output(led,False)
#             time.sleep(0.1)
#     except KeyboardInterrupt:
#         #Catch keyboard interrupt
#         GPIO.output(led,False)
#         os.system("sudo /sbin/ip link set can0 down")
#         print('\n\rKeyboard interrtupt')

# def can_rx_task():
# 	while True:
# 		message = bus.recv()
# 		if message.arbitration_id == PID_REPLY and message.data[2] == ENGINE_COOLANT_TEMP:
# 			c = '{0:f} {1:x} {2:x} '.format(message.timestamp, message.arbitration_id, message.dlc)
# 			s=''
# 			for i in range(message.dlc ):
# 				s +=  '{0:x} '.format(message.data[i])
# 			temperature = message.data[3] - 40			#Convert data into temperature in degree C
# 			print('\r {}  Coolant temp = {} degree C  '.format(c+s,temperature))
# -------------------------------------------------------------------------------------------------------       
if __name__ == '__main__':
    sio.start_background_task(test)
    eventlet.wsgi.server(eventlet.listen(("", 6001)), app)

