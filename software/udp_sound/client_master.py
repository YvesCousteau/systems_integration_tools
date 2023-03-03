import socket
import sys
import json 
import threading, wave, pyaudio, time
import os

port = 9633
bufferSize = 65536
ip = sys.argv[1]
chunk = 1024
wf = wave.open("../../assets/music/file_example.wav")
p = pyaudio.PyAudio()

if sys.argv[2] == 'stop':
    print('stop')
    os.system('pkill -9 -f client_master')
    sys.exit("Exiting the code with sys.exit()!")
# Create a socket at client side
try:
    sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET,socket.SO_RCVBUF,bufferSize)
except socket.error as err:
    print('Socket error because of %s' %(err))

print("channels ",wf.getnchannels())
print("format ",wf.getsampwidth())
print("rate ",wf.getframerate())

stream = p.open(
    format=p.get_format_from_width(wf.getsampwidth()),
    channels=wf.getnchannels(),
    rate=wf.getframerate(),
    input=True,
    frames_per_buffer=chunk
)

sock.sendto(b'SEXE', (sys.argv[1], port))

data = None
sample_rate = wf.getframerate()
while True:
    # msg,address = sock.recvfrom(bufferSize)
    # print('Message from Client >> {}'.format(msg))
    # print('Client IP Address:{}'.format(address))
    while True:
        data = wf.readframes(chunk)
        sock.sendto(data,(sys.argv[1], port))
        time.sleep(0.95*chunk/sample_rate)
    
    sock.sendto(msg,address)

sock.close()