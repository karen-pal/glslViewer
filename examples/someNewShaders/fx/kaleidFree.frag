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
//f0:count free:
//f1:zoom:
//f2:source:

   float f0 = mix(0.05, 1.0, fparams[0]);
   float f1 = mix(0.3, 1.0, fparams[1]);
   float f2 = mix(0.05, 1.0, fparams[2]);

#define PI 3.1415926535897932384626
float time = float(itime) + ftime;
int numberOfAxis = 2; // description "The number of splitting axis" defaultval="8"

int intModulo(float a,float b) {
float m = mod(a, b);
return int(m+0.5);
} //endof intModulo

//---------------------------------------------------------------------------------------------------
// https://graphicdesign.stackexchange.com/questions/88165/program-for-image-kaleidoscope-mirror-effect-similar-to-adobe-capture-pattern-tr/88237

void main(void) {

float angleFrac = (2.0 * PI) / float(2 * numberOfAxis) * f0;

vec2 c = tcoord - 0.5; //map to range [-0.5, 0.5]

// convert to polar coordinates 
float phi = abs(atan(c.y, c.x)); 
float r = length(c) /f1;

int count = int(phi / angleFrac);

phi = mod(phi, angleFrac);
if( intModulo(float(count),2.0) == 1) {
phi = angleFrac - phi;
}

//from polar coordinates
float x = r * cos(phi);
float y = r * sin(phi);

vec2 cc = vec2(x,y) + f2 ; //map to range [0.0, 1.0]
vec4 color = texture2D(tex, cc);
gl_FragColor = color;


} //endof main



