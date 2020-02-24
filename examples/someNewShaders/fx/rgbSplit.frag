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
//f0:color curl:
//f1:dome zoom:
//f2:blue shift:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.2, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// URL:  https://github.com/cansik/processing-postfx/blob/master/shader/rgbSplitFrag.glsl

void main(void) {
    vec2 dir = tcoord.xy - vec2(.5);
    float d = .7 * length(dir) /f1;
    normalize(dir);
    vec2 value = d * dir * 1000.0 * f0;

    vec4 c1 = texture2D(tex, tcoord.xy - value / tres.x);
    vec4 c2 = texture2D(tex, tcoord.xy + value / tres.y);
    vec4 c3 = texture2D(tex, tcoord.xy - value /f2 / tres.y);
    
    gl_FragColor = vec4(c1.r, c2.g, c3.b, c1.a + c2.a + c3.b);

} //endof main




