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
//f0:thickness:
//f1::
//f2::
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

//---------------------------------------------------------------------------------------------------
void main(void) {

float saw = abs(ftime - 0.5) * 1.0 + 0.49;

float thickness = 8.0 * f0+ saw;
vec2 texelsize = vec2(thickness/tres.x, thickness/tres.y);

vec4 tm1m1 = texture2D(tex,tcoord+vec2(-1,-1)*texelsize);
vec4 tm10 = texture2D(tex,tcoord+vec2(-1,0)*texelsize);
vec4 tm1p1 = texture2D(tex,tcoord+vec2(-1,1)*texelsize);
vec4 tp1m1 = texture2D(tex,tcoord+vec2(1,-1)*texelsize);
vec4 tp10 = texture2D(tex,tcoord+vec2(1,0)*texelsize);
vec4 tp1p1 = texture2D(tex,tcoord+vec2(1,1)*texelsize);
vec4 t0m1 = texture2D(tex,tcoord+vec2(0,-1)*texelsize);
vec4 t0p1 = texture2D(tex,tcoord+vec2(0,-1)*texelsize);

vec4 xdiff = -1.0*tm1m1 + -2.0*tm10 + -1.0*tm1p1 + 1.0*tp1m1 + 2.0*tp10 + 1.0*tp1p1;
vec4 ydiff = -1.0*tm1m1 + -2.0*t0m1 + -1.0*tp1m1 + 1.0*tm1p1 + 2.0*t0p1 + 1.0*tp1p1;
vec4 tot = sqrt(xdiff*xdiff+ydiff*ydiff);

vec4 col = tot;
col.a = 1.0;

vec4 comp = vec4(greaterThan(col,vec4(saw)));
//vec4 comp = vec4(greaterThan(col,vec4(0.1)));
float min = 0.0;
float max = 1.0;
gl_FragColor = clamp(comp,vec4(min),vec4(max));

} //endof main



