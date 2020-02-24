// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
precision mediump float;
varying vec2 tcoord;// 
uniform sampler2D tex;// texture one
uniform sampler2D tex2;// texture two
uniform vec2 tres;// size of texture (screen)
uniform vec4 fparams;// 4 floats coming in 
uniform ivec4 iparams;// 4 ints coming in
uniform float ftime;// 0.0 to 1.0
uniform int itime;// increases when ftime hits 1.0
//f0:horz pinch:
//f1:vert pinch:
//f2:zoom:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/XsVSW1

void main(void) {

  vec2 p = gl_FragCoord.xy/tres.xy - 0.5;
  
  // cartesian to polar coordinates
  float r = length(p);
  float a = atan(p.y, p.x);
  
  // distort
  r = sqrt(r)*0.3 / f2; // pinch
  //r = r*r*3.0; // bulge
  
  // polar to cartesian coordinates
  p = r * vec2(cos(a)*f0, sin(a)*f1);
  
  vec4 color = texture2D(tex, p + 0.5);
  gl_FragColor = color;

} //endof main




