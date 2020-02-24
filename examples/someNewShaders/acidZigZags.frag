// shader type: gen 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
precision mediump float;
varying vec2 tcoord;// location
uniform sampler2D tex;// texture one
uniform sampler2D tex2;// texture two
uniform vec2 tres;// size of texture (screen)
uniform vec4 fparams;// 4 floats coming in
uniform ivec4 iparams;// 4 ints coming in
uniform float ftime;// 0.0 to 1.0
uniform int itime;// increases when ftime hits 1.0
//f0:wave 1:
//f1:wave 2:
//f2:zoom:
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;
vec2 resolution = tres;
#define M_PI 3.141592653589793
// tiles by @hintz 2013-05-08

void main(void) {
vec2 position = (25. * f2 + 5.0)*(gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.x;

float a = 0.1*time*M_PI/3.0;
float r = length(position);
float c = cos(a) /f0;
float s = sin(a) /f1;
mat2 rotate = mat2(c,s,-s,c);
vec2 q = 1.0+sin(position+M_PI*sin(time-position.yx));
vec2 q2 = 1.0+sin(1.2*position+M_PI*sin(time-1.4*position.yx));
q = sqrt(abs(q*rotate));

vec3 color = sqrt(normalize(vec3(q.x-q2.y, reflect(q.x,q.y)+q2.y, q.y+reflect(q2.x,q2.y))));

gl_FragColor = vec4(color, 1.0);
}


