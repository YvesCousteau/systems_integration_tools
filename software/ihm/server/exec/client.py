import socket
import sys
import json 

msgFromClient = {"value":"You're", "stop":False}
bytesToSend = json.dumps(msgFromClient)

serverAddressPort = ("192.168.1.23", sys.argv[1])
bufferSize = 1024
# Create a socket at client side
try:
    sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
except socket.error as err:
    print('Socket error because of %s' %(err))

try:
    sock.connect(serverAddressPort)
    sock.send(bytesToSend)
except socket.gaierror:
    print('There an error resolving the host')
    sys.exit() 

print(bytesToSend,'was sent!')
sock.close()