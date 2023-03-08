#include <stdio.h>
#include <assert.h>

#include "brightness_layer.h"

int main() {
  BRIGHTNESS_LAYER_T brightnessLayer;

  initBrightnessLayer(&brightnessLayer, 0xFF, 5, -1, 0);

  sleep(1);

  updateBrightnessLayer(&brightnessLayer, 0xAA);

  sleep(30);

  destroyBrightnessLayer(&brightnessLayer);

  return 0;
}
