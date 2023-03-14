#include <assert.h>
#include <stdbool.h>
#include <stdio.h>

#include "brightness_layer.h"

void initBrightnessLayer(
  BRIGHTNESS_LAYER_T *br, 
  uint8_t alpha, 
  int32_t layer, 
  int32_t bgLayer,
  int32_t display_number
)
{
  // common
  int result;

  bcm_host_init();

  DISPMANX_DISPLAY_HANDLE_T display = vc_dispmanx_display_open(display_number);
  assert(display != 0);

  DISPMANX_MODEINFO_T info;
  result = vc_dispmanx_display_get_info(display, &info);
  assert(result == 0);

  br->display = display;

  // background
  uint32_t background = 0;

  VC_IMAGE_TYPE_T bgType = VC_IMAGE_8BPP;
  uint32_t vc_bgImage_ptr;

  br->bgResource = vc_dispmanx_resource_create(VC_IMAGE_RGB565, info.width, info.height, &vc_bgImage_ptr); // TODO: ? != bgType
  assert(br->bgResource != 0);

  VC_RECT_T bmp_rect;
  vc_dispmanx_rect_set(&bmp_rect, 0, 0, 1, 1);

  br->bgLayer = bgLayer;

  result = vc_dispmanx_resource_write_data(
    br->bgResource,
    bgType,
    sizeof(background),
    &background,
    &bmp_rect
  );
  assert(result == 0);

  // brightness
  uint32_t colour = alpha << 24;

  VC_IMAGE_TYPE_T type = VC_IMAGE_RGBA32;
  uint32_t vc_image_ptr;

  br->resource = vc_dispmanx_resource_create(type, 1, info.height, &vc_image_ptr);
  assert(br->resource != 0);

  VC_RECT_T dst_rect;
  vc_dispmanx_rect_set(&dst_rect, 0, 0, 1, 1);

  br->layer = layer;

  result = vc_dispmanx_resource_write_data(
    br->resource,
    type,
    sizeof(colour),
    &colour,
    &dst_rect
  );
  assert(result == 0);

  // common
  DISPMANX_UPDATE_HANDLE_T update = vc_dispmanx_update_start(0);
  assert(update != 0);

  addElementBrightnessLayer(br, display, update, info);

  result = vc_dispmanx_update_submit_sync(update);
  assert(result == 0);
}

void addElementBrightnessLayer(
  BRIGHTNESS_LAYER_T *br, 
  DISPMANX_DISPLAY_HANDLE_T display, 
  DISPMANX_UPDATE_HANDLE_T update,
  DISPMANX_MODEINFO_T info
)
{
  // background
  VC_DISPMANX_ALPHA_T bgAlpha = {
    DISPMANX_FLAGS_ALPHA_FIXED_ALL_PIXELS,
    255,
    0
  };

  // brightness
  VC_DISPMANX_ALPHA_T alpha = {
    DISPMANX_FLAGS_ALPHA_FROM_SOURCE, 
    255,
    0
  };

  // background
  VC_RECT_T bgSrc_rect;
  vc_dispmanx_rect_set(&bgSrc_rect, 0, 0, info.width, info.height);

  VC_RECT_T bgDst_rect;
  vc_dispmanx_rect_set(&bgDst_rect, 0, 0, info.width, info.height);

  br->bgElement = vc_dispmanx_element_add(
    update,
    display,
    br->bgLayer,
    &bgDst_rect,
    br->bgResource,
    &bgSrc_rect,
    DISPMANX_PROTECTION_NONE,
    &bgAlpha,
    NULL,
    DISPMANX_NO_ROTATE
  );
  assert(br->bgElement != 0);

  // brightness
  VC_RECT_T src_rect;
  vc_dispmanx_rect_set(&src_rect, 0, 0, 1, 1);

  VC_RECT_T dst_rect;
  vc_dispmanx_rect_set(&dst_rect, 0, 0, 0, 0);

  br->element = vc_dispmanx_element_add(
    update,
    display,
    br->layer,
    &dst_rect,
    br->resource,
    &src_rect,
    DISPMANX_PROTECTION_NONE,
    &alpha,
    NULL,
    DISPMANX_NO_ROTATE
  );
  assert(br->element != 0);
}

void updateBrightnessLayer(
  BRIGHTNESS_LAYER_T *br, 
  uint8_t alpha
)
{
  DISPMANX_UPDATE_HANDLE_T update = vc_dispmanx_update_start(0);
  assert(update != 0);

  VC_IMAGE_TYPE_T type = VC_IMAGE_RGBA32; // Cannot retrive it by layer ?
  uint32_t colour = alpha << 24;

  VC_RECT_T dst_rect; // Cannot retrive it by layer ?
  vc_dispmanx_rect_set(&dst_rect, 0, 0, 1, 1);

  int result = vc_dispmanx_resource_write_data(
    br->resource, 
    type,
    sizeof(colour),
    &colour,
    &dst_rect
  );
  assert(result == 0);

  result = vc_dispmanx_element_change_source(update, br->element, br->resource);
  assert(result == 0);

  result = vc_dispmanx_update_submit_sync(update);
  assert(result == 0);
}

void destroyBrightnessLayer(
  BRIGHTNESS_LAYER_T *br
)
{
  // common
  int result = 0;
  DISPMANX_DISPLAY_HANDLE_T display = br->display;

  DISPMANX_UPDATE_HANDLE_T update = vc_dispmanx_update_start(0);
  assert(update != 0);

  // brightness
  result = vc_dispmanx_element_remove(update, br->element);
  assert(result == 0);

  // background
  result = vc_dispmanx_element_remove(update, br->bgElement);
  assert(result == 0);

  // common
  result = vc_dispmanx_update_submit_sync(update);
  assert(result == 0);

  // brightness
  result = vc_dispmanx_resource_delete(br->resource);
  assert(result == 0);

  // background
  result = vc_dispmanx_resource_delete(br->bgResource);
  assert(result == 0);

  // common
  result = vc_dispmanx_display_close(display);
  assert(result == 0);
}
