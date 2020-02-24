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
//f1:offset:
//f2::

float f0 = mix(0.0, 1.0, fparams[0]);
float f1 = mix(0.0, 1.0, fparams[1]);
float f2 = mix(0.0, 1.0, fparams[2]);

float bw(vec2 coords) {
vec4 lm;
   lm = texture2D(tex, coords) * vec4(0.21, 0.71, 0.07, 1.);

return lm.r+lm.g+lm.b;
}

//---------------------------------------------------------------------------------------------------
void main(void) {
   vec2 xy = gl_FragCoord.xy;
vec2 uv = xy / tres.xy;
vec2 of = vec2(1.0 / 128.0 * f0, 1. -f1);

float bwColor = sqrt(
pow(abs(bw(uv) - bw(uv+of.xx)), 2.0) +
pow(abs(bw(uv + of.xy) - bw(uv + of.yx)), 2.0)
   );


    gl_FragColor = vec4(bwColor);
} //endof main



