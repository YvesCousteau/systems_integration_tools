import socket
import sys
import json 

port = 20001
bufferSize = 1024
ip = sys.argv[1]

msgFromClient = {"value":(sys.argv[2])}
bytesToSend = json.dumps(msgFromClient).encode()

serverAddressPort = (sys.argv[1], port)
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

print(bytesToSend,'was sent! at ',ip,':',port)

try:
    msgFromServer = sock.recvfrom(bufferSize)
except socket.gaierror:
    print('There an error resolving the host')
    sys.exit() 

print("Message From Server {}".format(msgFromServer[0]))

sock.close()