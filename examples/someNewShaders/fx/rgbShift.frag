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
// https://www.shadertoy.com/view/XltGWS
void main(void) {

    vec2 uv = gl_FragCoord.xy / tres.xy - .5;
    float amp = 0.5;
    float rAmt = 2. * f0 - 1. * amp ;
    float gAmt = 2. * f1 - 1. * amp;
    float bAmt = 2. * f2 - 1. * amp;

 
    vec3 col;
    col.r = texture2D( tex, vec2(uv.x + rAmt, uv.y + gAmt) ).r;
    col.g = texture2D( tex, vec2(uv.x + gAmt, uv.y - bAmt) ).g;
    col.b = texture2D( tex, vec2(uv.x - bAmt, uv.y - rAmt) ).b;
    
    gl_FragColor = vec4(col,1.0);


} //endof main



