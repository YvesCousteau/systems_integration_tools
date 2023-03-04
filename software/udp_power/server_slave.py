import socket
import sys
import json
import os


port = 20002
bufferSize = 1024
ip = sys.argv[1]

# Create a datagram socket
sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
print("Socket created ...")
# Bind to address and ip
sock.bind((ip, port))
print("Server up and listening on : "+ip+" / "+str(port))
# Listen for incoming datagrams
msg = str.encode("Hello Client!")
while(True):
    bytesAddressPair = sock.recvfrom(bufferSize)
    message = json.loads(bytesAddressPair[0].decode())
    address = bytesAddressPair[1]
    clientMsg = "Message from Client >> {}".format(message)
    clientIP  = "Client IP Address:{}".format(address)
    print(clientMsg)
    print(clientIP)
    if message["value"] == "reboot":
        os.system('sudo reboot')
    elif message["value"] == "powerOff":
        os.system('sudo poweroff')
    sock.sendto(msg,address)
    
    

