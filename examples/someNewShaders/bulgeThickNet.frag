#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord;// 
uniform sampler2D tex;// texture one
uniform sampler2D tex2;// texture two
uniform vec2 u_resolution;// size of texture (screen)
uniform vec4 fparams;// 4 floats coming in 
uniform ivec4 iparams;// 4 ints coming in
uniform float u_time;// 0.0 to 1.0
uniform int itime;// increases when ftime hits 1.0

//---------------------------------------------------------------------------------------------------
// source : http://glslsandbox.com/e#35264.0

//---------------------------------------------------------------------------------------------------
void main(void) {
//f0:vert ripples:
//f1:blue speed:
//f2:vert roll:
float f0 = mix(0.5, 0.05, fparams[0]);
float f1 = mix(0.49, 0.51, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);


float mytime = u_time;
float quad = 100. ;
vec2 pos = ( gl_FragCoord.xy / u_resolution.xy )*vec2(quad,quad);

pos.y -= sin(pos.x / (3.14 * 10.0 *f0)) * sin(pos.y / (3.14 * 10.0) - 1.5) * sin(mytime) * (10.0) ;

float c = mytime*10.0;
float x = floor(pos.x);
float y = pos.y+c+(f2 * 100.);
gl_FragColor = vec4(0.1+cos(x* 4.0),cos(y),cos(y * f1 * 4.0),1.0);



} //endof main


