import time
from machine import UART, Pin, SPI
import max7219


class Main:
    def __init__(self):
        # BUTTON #
        self.button = [Pin(28, Pin.IN),Pin(22, Pin.IN),Pin(8, Pin.IN),Pin(9, Pin.IN)]
        # LED #
        self.led = [Pin(25, Pin.OUT),Pin(6, Pin.OUT), Pin(7, Pin.OUT)]
        # UART #
        self.uart = UART(0, baudrate=115200, parity=None, stop=1, bits=8)
        print(self.uart)
        b = None
        msg = ""
        stop = False
        # MAX7219 #
        self.spi = SPI(0, sck=Pin(18), mosi=Pin(19))
        self.cs = Pin(17, Pin.OUT)
        self.display = max7219.Matrix8x8(self.spi, self.cs, 4)
        self.display.fill(0)
        self.display.show()
        # Fonctions
        while True:
            if self.uart.any():
                b = self.uart.read()
                print(b)
                try:
                    msg = b.decode()
                    print("UART >> " + msg)
                    self.max7219_fct(msg,3)
                    
                except:
                    print("UART >> Error")
            time.sleep(1)

    def max7219_fct(self,word,button):
        # MAX7219 #
        self.display.brightness(1)
        scrolling_message = word
        length = len(scrolling_message)
        column = (length * 8)
        self.display.fill(0)
        self.display.show()
        time.sleep(1)
        
        # Scrolling
        for x in range(32, -column, -1):
            self.display.fill(0)
            self.display.text(scrolling_message, x, 0, 1)
            self.display.show()
            time.sleep(0.1)

            # Stop condition not working for now
            if self.button[button].value() == 0:
                self.display.fill(0)
                self.display.show()
                return

                
if __name__ == '__main__':
    main = Main()
    



