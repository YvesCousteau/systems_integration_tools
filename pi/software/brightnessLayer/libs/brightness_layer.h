#ifndef BRIGHTNESS_LAYER_H
#define BRIGHTNESS_LAYER_H

#include "bcm_host.h"

typedef struct
{
    int32_t layer;
    int32_t bgLayer;
    DISPMANX_RESOURCE_HANDLE_T resource;
    DISPMANX_RESOURCE_HANDLE_T bgResource;
    DISPMANX_ELEMENT_HANDLE_T element;
    DISPMANX_ELEMENT_HANDLE_T bgElement;
    DISPMANX_DISPLAY_HANDLE_T display;
} BRIGHTNESS_LAYER_T;

void initBrightnessLayer(BRIGHTNESS_LAYER_T *br, uint8_t alpha, int32_t layer, int32_t bgLayer, int32_t display_number);

void addElementBrightnessLayer(BRIGHTNESS_LAYER_T *br, DISPMANX_DISPLAY_HANDLE_T display, DISPMANX_UPDATE_HANDLE_T update, DISPMANX_MODEINFO_T info);

void updateBrightnessLayer(BRIGHTNESS_LAYER_T *br, uint8_t alpha);

void destroyBrightnessLayer(BRIGHTNESS_LAYER_T *br);

#endif

