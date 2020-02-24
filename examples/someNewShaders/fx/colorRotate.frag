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

//f0:speed:
//f1::
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/lltGW2

void main(void) {

float speed = 5.0;

vec2 uv = tcoord.xy;
vec4 c = texture2D(tex, uv);
c.rgb = sin(c.rgb*(6.2+speed/tres.y*20.)+time*5.0 +(4.*f0 -2.0)+vec3(3., 1.5,.5*texture2D(tex, vec2(1.5*length(uv-.5),1.)).r))*.5+.5;

c.a = 1.0;
gl_FragColor = c;

} //endof main



