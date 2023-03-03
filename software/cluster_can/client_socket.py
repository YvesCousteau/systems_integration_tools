import threading
import time
import eventlet
import socketio
import queue

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

queue = queue.Queue()


@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on('speed')
def speedOn(sid, data):
    speed = queue.get()
    print('speed ', speed)
    sio.emit('timer', speed)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

def loop1_10():
    speed = 10
    while True:
        time.sleep(0.3)
        speed = speed + 1
        queue.put(speed)

if __name__ == '__main__':
    

    threading.Thread(target=loop1_10).start()
    eventlet.wsgi.server(eventlet.listen(('192.168.5.40', 3001)), app)

