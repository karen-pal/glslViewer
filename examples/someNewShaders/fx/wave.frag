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
//f0:x pos:
//f1:y pos:
//f2::

float f0 = mix(0.0, 1.0, fparams[0]);
float f1 = mix(0.0, 1.0, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/MlfSWS

void main(void) {

    vec2 uv = gl_FragCoord.xy / tres.xy;
    float t = time;
    float x = gl_FragCoord.x, y = gl_FragCoord.y;
    uv.y += sin(t * 2.0 + y / 16.0) * 0.05 +f0;
    uv.x += sin(t * 3.0 + x / 16.0) * 0.05 +f1;
    vec4 p = texture2D(tex, uv);
    gl_FragColor = p;

} //endof main




