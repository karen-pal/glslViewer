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
//f0:horz stretch:
//f1:vert stretch:
//f2:source:

float f0 = mix(0.2, 1., fparams[0]);
float f1 = mix(0.2, 1., fparams[1]);
float f2 = mix(0.3, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/ldsGz2

void main(void) {

float aspect = tres.x/tres.y;
float vX = gl_FragCoord.x/tres.x /f0;
float vY = gl_FragCoord.y/tres.y /f1;
float multiplierX = sin(time/2.0) + 150.;
float multiplierY = sin(time/2.0) *aspect + 150.;
vec2 vv = vec2(tres.x/multiplierX,tres.y/multiplierY);
vec2 vg = vec2(sin(vX*vv.x),sin(vY*vv.y)) * f2;
vec4 v= texture2D(tex,cos(vg)) ;
vec4 vs = texture2D(tex,cos(vg)*2.0-1.0);
gl_FragColor = (4.0*v)*(vs/4.0);
gl_FragColor.a = 1.0;


} //endof main



