// shader type: gen 
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
//f0:height:
//f1:width:
//f2:diag zoom:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.2, 0.95, fparams[2]);
//http://glslsandbox.com/e#48546.0

float time = float(itime) + ftime;
//---------------------------------------------------------------------------------------------------
void main(void) {
  vec3 color = vec3(1.0, 0.3, 16.5);

  vec2 p = (gl_FragCoord.xy * 4.0 * f2 - tres) / min(tres.x, tres.y);

  float a = (tan(p.x * (3.+ 8.0*f1)  + time) + sin(p.x * 1.0 + time * 3.0) + sin(p.x * 1.0 + time * 12.0)+ sin(p.x * 7.0 + time * 6.0))*0.5;

  float f = f0 / abs(p.y*p.y*p.y*2. + a*a*a*a);

  vec3 destColor = color * f;
  gl_FragColor = vec4(destColor, 1.0);

   
} //endof main


