import time
from machine import Pin, ADC, PWM, UART
uart = UART(0, baudrate=115200, tx=Pin(0), rx=Pin(1))
adc = ADC(Pin(27, mode=Pin.IN))
pwm_led = PWM(Pin(20,mode=Pin.OUT))
pwm_led.freq(1_000)

while True:
    val = adc.read_u16()
    print(int(val* (180 / 65535)), "Km/h")
    uart.write(str(int(val* (180 / 65535))))
    
    pwm_led.duty_u16(val)
    time.sleep_ms(2000)