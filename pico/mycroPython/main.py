import time
from machine import UART, Pin, SPI
import max7219
import functions
import _thread

class Main:
    def __init__(self):
        # BUTTON #
        self.button = [Pin(28, Pin.IN),Pin(22, Pin.IN),Pin(8, Pin.IN),Pin(9, Pin.IN)]
        # LED #
        self.led = [Pin(25, Pin.OUT),Pin(6, Pin.OUT), Pin(7, Pin.OUT)]
        # UART #
        self.uart = UART(0, baudrate=115200)
        # MAX7219 #
        self.spi = SPI(0, sck=Pin(18), mosi=Pin(19))
        self.cs = Pin(17, Pin.OUT)
        self.display = max7219.Matrix8x8(self.spi, self.cs, 4)
        self.display.fill(0)
        self.display.show()

        # Fonctions
        self.loop()

    def loop(self):
        while True:
            if self.button[0].value() == 0:
                functions.led(self,0)
            if self.button[1].value() == 0:
                functions.led(self,1)
            if self.button[2].value() == 0:
                functions.uart_read(self) 
            if self.button[3].value() == 0:
                functions.max7219_scrolling(self,"suce",3)
            time.sleep(0.2)
    
if __name__ == '__main__':
    main = Main()
    


