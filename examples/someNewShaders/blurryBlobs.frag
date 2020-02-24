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
//f0:red blur:
//f1:green blur:
//f2:blue blur:
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);


float time = float(itime) + ftime;
vec2 resolution = tres;

void main( void ) {

vec2 p = 2.0 * gl_FragCoord.xy / resolution.xy - 1.0;

float r = 0.75 + sin( p.x ) * ( cos( 5.0  * p.x + time ) + sin( 7.0 * p.y - time ) + sin( time ) ) / f0;
float g = 0.25 + sin( p.y ) * ( cos( 3.0  * p.y + time ) + sin( 9.0 * p.x - time ) - cos( time ) ) / f1;
float b = 0.75 + sin( p.x ) * ( cos( 11.0 * p.x + time ) + sin( 3.0 * p.y + time ) + cos( time ) ) / f2;

gl_FragColor = vec4( r, g, b, 1.0 );

}


