import time

def led(self,num):
    # LED #
    self.led[num].value(1)
    time.sleep_ms(250)
    self.led[num].value(0)
    time.sleep_ms(250)
def max7219_scrolling(self,word,button):
    # MAX7219 #
    self.display.brightness(10)
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
def uart_read(self):
    b = None
    msg = ""
    # Read uart answer #
    self.led[0].value(1)
    time.sleep_ms(250)
    if self.uart.any():
        b = self.uart.readline()
        print(type(b))
        print(b)
        try:
            msg = b.decode('utf-8')
            print(type(msg))
            print(">> " + msg)
        except:
            pass
    self.led[0].value(0)
    time.sleep_ms(250)