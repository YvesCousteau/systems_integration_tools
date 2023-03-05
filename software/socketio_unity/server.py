import eventlet
import socketio
import os
import serial
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
    print('speed ', sid)
    sio.enter_room(sid, "speed")

@sio.event
def disconnect(sid):
    sio.leave_room(sid, "speed")
    print('disconnect ', sid)


def test():
    speed = 0
    while True:
        speed += 1
        sio.emit("speed::update", speed, room="speed")
        sio.sleep(0.05)
def uart():
    ser = serial.Serial(
        port='/dev/ttyUSB0',
        baudrate = 9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=0
    )
    speed = 0
   
    while True:
        speed = ser.readline()
        sio.emit("speed::update", speed.decode()[:-1], room="speed")
        ser.flush()
        sio.sleep(0.1)

if __name__ == '__main__':
    sio.start_background_task(uart)
    eventlet.wsgi.server(eventlet.listen(("", 6001)), app)

