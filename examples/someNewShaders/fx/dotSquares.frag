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
//f0:squares:
//f1:center dots:
//f2:zoom + spin:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[2]);
float f2 = mix(0.3, 0.95, fparams[1]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/MdcSDB

void main(void) {

    //float dotsize = 5.0 * (2.0 + sin (0.1 * time));
    float dotsize = 1.0 + 15.0 *f1 * 2.; // + sin(fparams.x);
    vec2 mirrorCoord = vec2 (tres.x - gl_FragCoord.x, gl_FragCoord.y);
    vec2 dotcenter = (mirrorCoord - mod(mirrorCoord, 2.0 * dotsize)) + vec2(dotsize);
    float rad = length(mirrorCoord - dotcenter);
    
    vec2 sampleAt = dotcenter / tres.xy;
    
    vec2 musicSampleAt = vec2(mod(dot(sampleAt, vec2(311, 733)), 1.0), 0.0);
    
    float dotRad = texture2D(tex2, musicSampleAt).x * (dotsize * f2  - 2.0);
    
    float inside = smoothstep (dotRad + 2.0 /f0, dotRad, rad);
    
    vec3 rgb = texture2D(tex, sampleAt).xyz;
    
    rgb = 0.25 * (step(vec3(0.1), rgb) + step(vec3(0.25), rgb) +
                  step(vec3(0.4), rgb) + step(vec3(0.55), rgb));
   //  rgb = vec3(1.0, 0.0, 0.0);
    
    vec3 background = vec3(0.0);
 gl_FragColor = vec4(mix(background, rgb, inside),1.0);

} //endof main




