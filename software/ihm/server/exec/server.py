import socket
import sys
sys.path.insert(1, '../functions/')
import uart

port = 20001
bufferSize = 1024
ip = "192.168.1.23"

# Create a datagram socket
sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
print("Socket created ...")
# Bind to address and ip
sock.bind((ip, port))
print("Server up and listening")
# Listen for incoming datagrams
while(True):
    bytesAddressPair = sock.recvfrom(bufferSize)
    message = bytesAddressPair[0].decode()
    address = bytesAddressPair[1]
    clientMsg = "Message from Client >> {}".format(message)
    clientIP  = "Client IP Address:{}".format(address)
    print(clientMsg)
    print(clientIP)
    
    # uart.sender(clientMsg.value,clientMsg.stop)