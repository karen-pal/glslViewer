#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord;// location
uniform sampler2D tex;// texture one
uniform sampler2D tex2;// texture two
uniform vec2 u_resolution;// size of texture (screen)
uniform vec4 fparams;// 4 floats coming in
uniform ivec4 iparams;// 4 ints coming in
uniform float u_time;// 0.0 to 1.0
uniform int itime;// increases when ftime hits 1.0
//f0:horz pull:
//f1:vert pull:
//f2:back plasma:
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);


float time = u_time;
vec2 resolution = u_resolution*atan(u_time)*.01;
void main( void ) {

vec2 position = ( gl_FragCoord.xy / resolution.xy ) * vec2(f0,f1);

float color = sin(position.x * 10.0 + time) + cos(position.y * 10.0 + time) * length(position);
float green = cos(position.x * 64.0 * f2 + sin(time)) + sin(position.y * 10.0 + sin(time));
float blue = 10.0 * sin(time * 1.0) * cos(position.x) * position.y * position.x;
blue += tan(position.x*(cos(position.y+(time/10.0))*0.5) * 50.0) + tan(position.y*(sin(exp(position.x)+sin(time/ 13.0))*0.5) * 33.0);

gl_FragColor = vec4( vec3( color, color * 0.5, sin( color + time / 3.0 ) * 0.75 ), 1.0 );

//vec4(green+color, blue+green, blue+color,1.0);
}


