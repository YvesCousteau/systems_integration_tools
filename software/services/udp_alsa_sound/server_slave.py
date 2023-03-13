import socket
import sys
import json
import os
import threading, wave, pyaudio, time, queue

port = 9633
bufferSize = 65536
ip = sys.argv[1]
chunk = 1024
p = pyaudio.PyAudio()
q = queue.Queue(maxsize=2000)

def getAudioData():
    while True:
        frame,_= sock.recvfrom(bufferSize)
        q.put(frame)
        print('Queue size...',q.qsize())

# Create a datagram socket
sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET,socket.SO_RCVBUF,bufferSize)
print("Socket created ...")
# Bind to address and ip
sock.bind((ip, port))
print("Server up and listening on : "+ip+":"+str(port))


msg = str.encode("Hello Client!")


stream = p.open(
    format=p.get_format_from_width(2),
    channels=1,
    rate=22050,
    output=True,
    frames_per_buffer=chunk
)

# while(True):
#     bytesAddressPair = sock.recvfrom(bufferSize)
#     message = json.loads(bytesAddressPair[0].decode())
#     address = bytesAddressPair[1]
#     clientMsg = "Message from Client >> {}".format(message)
#     clientIP  = "Client IP Address:{}".format(address)
#     print(clientMsg)
#     print(clientIP)
#     if message["value"] == "play":
#         print('play')
#     if message["value"] == "stop":
#         print('stop')
#     # Sending a reply to client
#     sock.sendto(msg,address)
    

t1 = threading.Thread(target=getAudioData, args=())
t1.start()
time.sleep(1)

print('Now Playing...')
while True:
    frame = q.get()
    stream.write(frame)
















message = b'Hello'
sock.sendto(message,(ip,port))

stream = p.open(
    format=p.get_format_from_width(wf.getsampwidth()),
    channels=wf.getnchannels(),
    rate=wf.getframerate(),
    input=True,
    frames_per_buffer=chunk
)
data = None
sample_rate = wf.getframerate()
# Listen for incoming datagrams
msg = str.encode("Hello Client!")
while True:
        msg,address = sock.recvfrom(bufferSize)
        print('Message from Client >> {}'.format(msg))
        print('Client IP Address:{}'.format(address))
        while True:
            data = wf.readframes(chunk)
            sock.sendto(data,address)
            time.sleep(0.95*chunk/sample_rate)
        
        sock.sendto(msg,address)