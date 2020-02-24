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
//f0:blob size:
//f1:blue width:
//f2:color cycle:
float f0 = mix(0.5, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;
vec2 resolution = tres;
//SB: Blob variant

float df( vec2 v, float r ) {
float d = length(v);
return 1.0 / d;
}

void main( void ) {
vec2 pos = ( gl_FragCoord.xy ) ;


vec2 ctr = resolution.xy / 2.0;  
vec2 c0 = ctr +  vec2( 143.0 * cos(time), 116.0 * sin(time) );
vec2 c1 = ctr +  vec2( 150.0 * sin(time), 52.0 * cos(1.3*time) );
vec2 c2 = ctr +  vec2( 145.0 * sin(time), 30.0 * cos(1.6*time+sin(2.0*time)) );
vec2 c3 = ctr +  vec2( 105.0 * cos(time), 60.0 * sin(2.6*time+cos(3.0*time)) );

const float r = 30.0;

vec2 d0 = c0 - pos;
vec2 d1 = c1 - pos;
vec2 d2 = c2 - pos;
vec2 d3 = c3 - pos;

float col = 0.0;
col += df( d0, r );
col += df( d1, r );
col += df( d2, r );
col += df( d3, r );

float t = 0.02375 * f0;
col = smoothstep( 0.0, f1 *2., (col-t)/t );

float t2 = 0.02;
float col3 =smoothstep( 0.0, 1.0, (col-t2)/t2 );
col3 = pow( 0.30*col3, 1.0 ); 

float col2 = pow( 2.0*col, 1.0 ) *f2;

gl_FragColor = vec4( vec3(col2,col,col3), 1.0 );

}


