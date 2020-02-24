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
//f0::
//f1::
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

//---------------------------------------------------------------------------------------------------
void main(void) {

float mytime = float(itime) + ftime;
float usetime = mytime * 0.4 ;// 0.1 for slower, 10.0 for faster

vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / tres.xy;
vec2 uv;

float a = atan(p.y,p.x);
float r = sqrt(dot(p,p));

//uv.x = 100.0 * usetime+.1/r;             // only moves when camera does
uv.x = 4.0 * usetime+.1/r;
uv.y = a/3.1416;

vec3 colt =  texture2D(tex,uv).xyz;

gl_FragColor = vec4(colt*r,1.0);

} //endof main



