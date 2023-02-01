import socket
import sys
sys.path.insert(1, '../functions/')
import uart
import json
import threading
import queue

def server(queue):
    port = 20001
    bufferSize = 1024
    ip = sys.argv[1]

    # Create a datagram socket
    sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    print("Socket created ...")
    # Bind to address and ip
    sock.bind((ip, port))
    print("Server up and listening on : "+ip+" / "+str(port))
    # Listen for incoming datagrams
    while(True):
        bytesAddressPair = sock.recvfrom(bufferSize)
        message = json.loads(bytesAddressPair[0].decode())
        address = bytesAddressPair[1]
        clientMsg = "Message from Client >> {}".format(message)
        clientIP  = "Client IP Address:{}".format(address)
        print(clientMsg)
        print(clientIP)
        queue.put(message)

clientMsg = ""

queue = queue.Queue()
serv = threading.Thread(target=server, args=(queue,))
function = threading.Thread(target=uart.sender, args=(queue,))

serv.start()
function.start()

