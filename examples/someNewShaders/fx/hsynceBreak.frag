// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
precision mediump float;
varying vec2 tcoord;       //
uniform sampler2D tex;     // texture one
uniform sampler2D tex2;    // texture two
uniform vec2 tres;         // size of texture (screen)
uniform vec4 fparams;      // 4 floats coming in
uniform ivec4 iparams;     // 4 ints coming in
uniform float ftime;       // 0.0 to 1.0
uniform int itime;         // increases when ftime hits 1.0
//f0:x intensity:
//f1:y intensity:
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

//---------------------------------------------------------------------------------------------------
//https://github.com/teragonaudio/VDMX-Shaders/blob/master/ISF/Halo.fs

void main(void) {
  int randomizeY = 0;
  int randomizeX = 1;
  float intensityX = f0;
  float intensityY = f1;

  float maxOffset = 0.1;
  vec2 uv = tcoord;
  float xPos = randomizeY==1 ? uv.x : 0.0;
  float yPos = randomizeX==1 ? uv.y : 0.0;
  vec2 seed = vec2(time, yPos + xPos);
  float randResult = rand(seed);
  float direction = randResult > 0.5 ? -1.0 : 1.0;

  uv.x += maxOffset * randResult * intensityX * direction;
  uv.y += maxOffset * randResult * intensityY * direction;

  gl_FragColor = texture2D(tex, uv);
}



