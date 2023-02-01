import socket
import sys
import json 

msgFromClient = {"value":(sys.argv[2])}
bytesToSend = json.dumps(msgFromClient).encode()

serverAddressPort = (sys.argv[1], 20001)
bufferSize = 1024
# Create a socket at client side
try:
    sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
except socket.error as err:
    print('Socket error because of %s' %(err))

try:
    sock.sendto(bytesToSend, serverAddressPort)
except socket.gaierror:
    print('There an error resolving the host')
    sys.exit() 

print(bytesToSend,'was sent!')
sock.close()