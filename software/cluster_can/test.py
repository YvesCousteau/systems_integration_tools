import socketio

sio = socketio.Client()
sio.connect('http://0.0.0.0:6001')

@sio.event
def connect():
    print("[+] Connected")

@sio.event
def connect_error(data):
    print("[!] Connection Error", data)

@sio.event
def disconnect():
    print("[+] Disconnected")


@sio.on('*')
def catch_all(event, data):
    print(f"[*] {event} >>> {data}")


if __name__ == "__main__":
    sio.emit("speed::subscribe")
