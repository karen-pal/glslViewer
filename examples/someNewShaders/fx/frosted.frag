// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord; // location
uniform sampler2D tex;  // texture one
uniform sampler2D tex2; // texture two
uniform vec2 u_resolution;   // size of texture (screen)
uniform vec4 fparams;   // 4 floats coming in
uniform ivec4 iparams;  // 4 ints coming in
uniform float u_time; // 0.0 to 1.0
//uniform int itime;   // increases when ftime hits 1.0

//f0:frosting:
//f1::
//f2::
   float f0 = mix(0.05, 0.95, tan(u_time));
   float f1 = mix(0.05, 0.95, cos(u_time));
   float f2 = mix(0.05, 0.95, fract(u_time));

float time = u_time;

float rand(vec2 uv) {

    float a = dot(uv, vec2(92., 80.));
    float b = dot(uv, vec2(41., 62.));

    float x = sin(a) + cos(b) * 51.;
    return fract(x);
}

//https://www.shadertoy.com/view/MtsSWs
void main( void ) {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 rnd = vec2(rand(uv), rand(uv)*sin(u_time));

    uv += rnd  * 0.03 * f0;
    gl_FragColor = texture2D(tex, uv);
}



