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

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
void main(void) {

//orig
   float x = tcoord.x;
   vec4 texcol = vec4(0.0);
   float size = 0.01;
   if(mod(x,size)<size/2.0) {
   texcol = texture2D(tex,tcoord);
   } else {
   texcol = texture2D(tex,vec2(1.0,0.0)-tcoord);
   }
gl_FragColor = texcol;

} //endof main



