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
//f0:x mod:
//f1:y mod:
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
void main(void) {

    vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / tres.xy;
    vec2 uv;

    float a = atan(p.y,p.x);
    float r = sqrt(dot(p,p));

    uv.x = cos(0.6+time) + cos(cos(1.2+time)+a)/r *f0;
    uv.y = cos(0.3+time) + sin(cos(2.0+time)+a)/r *f1;

    vec3 col =  texture2D(tex,uv*.25).xyz;

    gl_FragColor = vec4(col*abs(r),1.0);
}




