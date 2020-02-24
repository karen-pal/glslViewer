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
//f0:frequency:
//f1:color offset:
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

vec2 size = vec2(50.0, 50.0) * f0;
vec2 distortion = vec2(20.0, 20.0);
float speed = 0.75;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/XslcR4
void main(void) {

    vec2 transformed = vec2(
        gl_FragCoord.x + sin(gl_FragCoord.y / size.x + time * speed) * distortion.x,
        gl_FragCoord.y + cos(gl_FragCoord.x / size.y + time * speed) * distortion.y
    );
    vec2 relCoord = gl_FragCoord.xy / tres.xy;
    gl_FragColor = texture2D(tex, transformed / tres.xy) + vec4(
        (cos(relCoord.x + time * speed * 4.0) + 1.0) / 2.0,
        (relCoord.x + relCoord.y) / 2.0 /f1,
        (sin(relCoord.y + time * speed) + 1.0) / 2.0, 0);

} //endof main




