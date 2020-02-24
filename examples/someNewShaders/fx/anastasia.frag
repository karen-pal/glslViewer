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
//f0:rotate 1:
//f1:rotate 2:
//f2:zoom:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.1, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/4dcSRj

void main(void) {
    vec2 uv = gl_FragCoord.xy / tres.xy * 2. - 1.;
    uv.x *= tres.x / tres.y;
    
    // mirror everything across x and y axex
    uv = abs(uv);

    // init to black
    gl_FragColor = vec4(vec3(0), 1);
    
    // add horizontal and vertical scrolling sine waves
    gl_FragColor.rgb += smoothstep(.2, .24, sin(uv.x + time * vec3(1, 2, 4)) + .5 - uv.y);
    gl_FragColor.rgb += smoothstep(.2, .24, sin(uv.y * 2. + time * vec3(1, 2, 4)) / 2. + 1. - uv.x);
    
    // flip colors that are out of bounds
    gl_FragColor.rgb = abs(1. - gl_FragColor.rgb);
    
    // rotate space around the center
    float angle = time * .2,
        s = sin(angle) * f0,
        c = cos(angle) * f1;
    uv *= mat2(c, -s, s, c);
    
    // multiply by camera pixels
    gl_FragColor *= texture2D(tex2, abs(.5 - fract(uv)) * f2 * 2.);

    // offset space according to spikes in fft data
 //   uv *= 10. + texture2D(tex, vec2(.3, .25)).x * 5.;
    
    // add morphing sine grid
    gl_FragColor *= clamp(sin(uv.x) * sin(uv.y) * 20. + sin(time) * 5., 0., 1.) + .5;



//vec4 v = texture2D(tex,tcoord);
//gl_FragColor = v;

} //endof main




