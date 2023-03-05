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

if __name__ == '__main__':
    sio.start_background_task(test)
    eventlet.wsgi.server(eventlet.listen(("", 6001)), app)

