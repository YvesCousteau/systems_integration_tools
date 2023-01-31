import socket
import sys
sys.path.insert(1, '../functions/')
import uart

port = 20001
bufferSize = 1024

# Create a datagram socket
sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
print("Socket created ...")
# Bind to address and ip
sock.bind(('', port))
sock.listen(5)
print("Server up and listening")
# Listen for incoming datagrams
while(True):
    c, addr = sock.accept()
    print('got connection from ', addr)

    clientMsg = c.recv(bufferSize)
    print("Json received -->", clientMsg)

    c.close()
    
    uart.sender(clientMsg.value,clientMsg.stop)