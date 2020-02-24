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
//f0:offset 1:
//f1:offset 2:
//f2:amplitude:
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);


float time = float(itime) + ftime;
vec2 resolution = tres;

void main( void ) {

vec2 position = ( gl_FragCoord.xy / resolution.xy ) / 4.0;

float c = 0.0;

if (gl_FragCoord.y < resolution.y/2.0 + sin(time*1.0 + gl_FragCoord.x/9.0)*80.0*f0 + sin(time*4.0 + gl_FragCoord.x/(10.0*sin(time * 0.005)))*10.0 /f1 + sin(time*6.0 + gl_FragCoord.x/10.0)*200.0 * f2) { 
c = 1.0; 
}

gl_FragColor = vec4( vec3( c, c, c ), 1.0 );

}


