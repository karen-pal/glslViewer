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
//f0:red edge:
//f1:green edge:
//f2:blue edge:

   float f0 = mix(0.05, 0.95, fparams[0]);
   float f1 = mix(0.05, 0.95, fparams[1]);
   float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/lsSBDR

void main(void) {

vec2 uv = gl_FragCoord.xy / tres.xy;
vec3 c = texture2D(tex, uv).xyz;

c = step(vec3(f0,f1,f2), c);

gl_FragColor = vec4(c.rgb,1.0);

} //endof main




