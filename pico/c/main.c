#include "pico/stdlib.h"
#include "hardware/uart.h"
#include <stdio.h>

#define UART_ID uart0
#define BAUD_RATE 115200

#define UART_TX_PIN 0
#define UART_RX_PIN 1

#define BUTTON_PIN 28
#define LED_2_PIN 27
#define LED_1_PIN 22
#define LED_IN_PIN 25

void init () {
  uart_init(UART_ID, BAUD_RATE);

  gpio_set_function(UART_TX_PIN, GPIO_FUNC_UART);
  gpio_set_function(UART_RX_PIN, GPIO_FUNC_UART);

  gpio_init(BUTTON_PIN);
  gpio_set_dir(BUTTON_PIN, GPIO_IN);

  gpio_init(LED_1_PIN);
  gpio_set_dir(LED_1_PIN, GPIO_OUT);

  gpio_init(LED_2_PIN);
  gpio_set_dir(LED_2_PIN, GPIO_OUT);

  gpio_init(LED_IN_PIN);
  gpio_set_dir(LED_IN_PIN, GPIO_OUT);

}

int main() {
  init();
  while (true) {
    if (gpio_get(BUTTON_PIN) == 0) {
      gpio_put(LED_2_PIN, 1);
      gpio_put(LED_1_PIN, 1);
      gpio_put(LED_IN_PIN, 1);
      sleep_ms(250);
      gpio_put(LED_2_PIN, 0);
      gpio_put(LED_1_PIN, 0);
      gpio_put(LED_IN_PIN, 0);
      uart_puts(UART_ID, " Hello, UART!\n");
      sleep_ms(250);
    }
  }
}

