import socket
import sys
import json
import threading
import queue

from luma.led_matrix.device import max7219
from luma.core.interface.serial import spi, noop
from luma.core.render import canvas
from luma.core.virtual import viewport
from luma.core.legacy import text, show_message
from luma.core.legacy.font import proportional, CP437_FONT, TINY_FONT, SINCLAIR_FONT, LCD_FONT
import re
import time
import argparse

def server(queue,sock,bufferSize):
    msg = str.encode("Hello Client!")
    while(True):
        bytesAddressPair = sock.recvfrom(bufferSize)
        message = json.loads(bytesAddressPair[0].decode())
        address = bytesAddressPair[1]
        clientMsg = "Message from Client >> {}".format(message)
        clientIP  = "Client IP Address:{}".format(address)
        print(clientMsg)
        print(clientIP)
        queue.put(message)
        sock.sendto(msg,address)

def function(queue):
    # create matrix device
    serial = spi(port=0, device=0, gpio=noop())
    device = max7219(serial, cascaded=4, block_orientation=90,
                     rotate=0, blocks_arranged_in_reverse_order=True)
    print("Created device")

    # start demo
    msg = ""
    while True:
        if(not queue.empty()):
            data = queue.get()
            msg = data["value"]
            if msg == "STOP":
                msg=""
        show_message(device, msg, fill="white", font=proportional(CP437_FONT))
    
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

queue = queue.Queue()
serv = threading.Thread(target=server, args=(queue,sock,bufferSize))
function = threading.Thread(target=function, args=(queue,))

serv.start()
function.start()

