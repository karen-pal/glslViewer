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
//f0:size:
//f1:stretch:
//f2:offset:

   float f0 = mix(0.0, 1.0, fparams[0]);
   float f1 = mix(0.0, 1.0, fparams[1]);
   float f2 = mix(0.0, 1.0, fparams[2]);

float time = float(itime) + ftime;
#define PI 3.1415926535897932384626

//---------------------------------------------------------------------------------------------------
void main(void) {

//orig
   float x = tcoord.x;
   vec4 texcol = vec4(0.0);
   float size = 0.01 /f0;
   float alias = 2.0 / f1;

   if(mod(x,size)<size/2.0) {
   texcol = texture2D(tex,tcoord/vec2(alias,1.0));
   } else {
   texcol = texture2D(tex,vec2(f2/alias,0.0)+tcoord/vec2(alias,1.0));
   }
gl_FragColor = texcol;

} //endof main



