// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord;       //
uniform sampler2D tex;     // texture one
uniform sampler2D tex2;    // texture two
uniform vec2 u_resolution;         // size of texture (screen)
uniform vec4 fparams;      // 4 floats coming in
uniform ivec4 iparams;     // 4 ints coming in
uniform float u_time;       // 0.0 to 1.0
uniform int itime;         // increases when ftime hits 1.0
//f0:color 1:
//f1:color 2:
//f2:color 3:

float f0 = mix(0.05, 0.95, sin(u_time));
float f1 = mix(0.05, 0.95, sin(u_time));
float f2 = mix(0.05, 0.95, sin(u_time));

//---------------------------------------------------------------------------------------------------
void main(void) {

//orig
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec4 texcol = texture2D(tex,uv*tan(u_time));
vec4 outcolor = texcol;

if (outcolor.r > 0.7) {
	outcolor.g =- 0.04;
	outcolor.b = (1.0 - outcolor.g) * 0.03;
}

float pmR =  f0 ;// color 1
float pmG =  f1 ;// color 2
float pmB =  f2 ;// color 3

vec4 colors[3];
colors[0] = vec4(0. ,0. ,pmB,1.);
colors[1] = vec4(pmR,pmG,0. ,1.);
colors[2] = vec4(pmR,0. ,0. ,1.);

// choose one or the other -
float lum = (texcol.r+texcol.g+texcol.b)/3.;

int ix = 1;
if (lum < 0.7) { ix = 0; }

float balance = (lum-float(ix)*0.2)/0.3;

//thermal = mix(colors[ix],colors[ix+1],(lum-float(ix)*0.5)/0.5);

vec4 thermal = outcolor;
if (ix == 0 ) {
	thermal.r = colors[0].r * (1.0 - balance) + colors[1].r * balance;
	thermal.g = colors[0].g * (1.0 - balance) + colors[1].g * balance;
	thermal.b = colors[0].b * (1.0 - balance) + colors[1].b * balance;
} else {
	thermal.r = colors[1].r * (1.0 - balance) + colors[2].r * balance;
	thermal.g = colors[1].g * (1.0 - balance) + colors[2].g * balance;
	thermal.b = colors[1].b * (1.0 - balance) + colors[2].b * balance;
}

gl_FragColor = thermal;

} //endof main



