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
//f0:red value:
//f1:green value:
//f2:blue value:

float f0 = mix(0.05, 1.0, fparams[0]);
float f1 = mix(0.05, 1.0, fparams[1]);
float f2 = mix(0.05, 1.0, fparams[2]);

//---------------------------------------------------------------------------------------------------
void main(void) {

vec4 v = texture2D(tex,tcoord);
gl_FragColor = vec4(abs(f0 -v.r), abs(f1 - v.g), abs(f2 - v.b), 1.0);

} //endof main



