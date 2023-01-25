import time
from machine import UART, Pin, SPI
import max7219
import _thread

class Main:
    def __init__(self):
        # BUTTON #
        self.button = [Pin(28, Pin.IN),Pin(22, Pin.IN),Pin(8, Pin.IN),Pin(9, Pin.IN)]
        # LED #
        self.led = [Pin(25, Pin.OUT),Pin(6, Pin.OUT), Pin(7, Pin.OUT)]
        # UART #
        self.uart = UART(0, baudrate=115200, parity=None, stop=1, bits=8)
        # MAX7219 #
        self.spi = SPI(0, sck=Pin(18), mosi=Pin(19))
        self.cs = Pin(17, Pin.OUT)
        self.display = max7219.Matrix8x8(self.spi, self.cs, 4)
        self.display.fill(0)
        self.display.show()
        # Fonctions
        self.loop()
    def loop(self):
        b = None
        msg = ""
        while True:
            if self.uart.any():
                b = self.uart.read()
                print(b)
                try:
                    msg = b.decode()
                    print("UART >> " + msg)
                except:
                    pass
            if msg != "":
                if msg == str(1):
                    self.max7219_fct("UART",3)
            else:
                if self.button[0].value() == 0:
                    self.led_fct(0)
                if self.button[1].value() == 0:
                    self.led_fct(1)
                if self.button[2].value() == 0:
                    self.led_fct(2) 
                if self.button[3].value() == 0:
                    self.max7219_fct("Max7219",3)
            time.sleep(0.2)
    def led_fct(self,num):
        # To set #
        self.led[num].value(1)
        time.sleep_ms(250)
        self.led[num].value(0)
        time.sleep_ms(250)
    def max7219_fct(self,word,button):
        # MAX7219 #
        self.display.brightness(1)
        scrolling_message = word
        length = len(scrolling_message)
        column = (length * 8)
        self.display.fill(0)
        self.display.show()
        time.sleep(1)
        while True:
            for x in range(32, -column, -1):
                self.display.fill(0)
                self.display.text(scrolling_message, x, 0, 1)
                self.display.show()
                time.sleep(0.1)
                if self.button[button].value() == 0:
                    self.display.fill(0)
                    self.display.show()
                    return
    def uart_fct(self):
        b = None
        msg = ""
        while True:
            time.sleep(1)
            print("-------")
            if self.uart.any():
                b = self.uart.read()
                print(b)
                try:
                    msg = b.decode()
                    print(msg)
                except:
                    pass
                
if __name__ == '__main__':
    main = Main()
    


