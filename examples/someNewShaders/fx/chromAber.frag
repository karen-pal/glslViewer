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
//f0:focus:
//f1:color offset:
//f2:focus 2:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.2, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

vec2 barrelDistortion(vec2 coord, float amt) {
    vec2 cc = coord - 0.5;
    float dist = dot(cc, cc);
    return coord + cc * dist * amt;
}

float sat(float t) {
    return clamp(t, 0.0, 1.0);
}

float linterp(float t) {
    return sat( 1.0 - abs( 2.0*t - 1.0 ) );
}

float remap(float t, float a, float b) {
    return sat((t - a) / (b - a)) ;
}

vec4 spectrum_offset(float t) {
    vec4 ret;
    float lo = step(t,0.5);
    float hi = 1.0-lo;
    float w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );
    ret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);

    return pow( ret, vec4(1.0/2.2) );
}

float distort = f0 * 8.;
const int num_iter = 8;
float reci_num_iter_f = 1.0 / f1/ float(num_iter);

//---------------------------------------------------------------------------------------------------
// URL: https://github.com/cansik/processing-postfx/blob/master/shader/chromaticAberrationFrag.glsl

void main() {   
    float max_distort = distort + 5.0 * fparams.x;
    //vec2 uv=(gl_FragCoord.xy/tres.xy*0.50)+.250 ;
    vec2 uv = tcoord.xy;
    vec4 sumcol = vec4(0.0);
    vec4 sumw = vec4(0.0);
    for ( int i=0; i<num_iter;++i) {
        float t = float(i) * reci_num_iter_f;
        vec4 w = spectrum_offset( t );
        sumw += w;
        sumcol += w * texture2D(tex, barrelDistortion(uv, f2 * max_distort*t ) );
    }

    gl_FragColor = sumcol / sumw;
}



