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
//f0::
//f1::
//f2::
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

//---------------------------------------------------------------------------------------------------
// thx rick!

void main(void) {

   f0 = 0.5;   // fixed value
   f1 = 0.5;   // fixed value

gl_FragColor = texture2D(tex,vec2(abs(2.0*(tcoord.x-f0)),abs(2.0*(tcoord.y-f1))));//mirror_NEx4
//gl_FragColor = texture2D(tex,vec2(abs(tcoord.x-f0)+ 0.5,abs(tcoord.y-f1)+ 0.5));// mirror_NE
//gl_FragColor = texture2D(tex,vec2(abs(tcoord.x+f0)+ 0.5,abs(tcoord.y-f1)+ 0.5));// mirror_NS
//gl_FragColor = texture2D(tex,vec2(abs(tcoord.x-f0)+ 0.5,abs(tcoord.y+f1)+ 0.5));// mirror_WE
//gl_FragColor = texture2D(tex,vec2(abs(4.0*(tcoord.x-f0)),abs(4.0*(tcoord.y-f1))));//mirror NEx16

} //endof main



