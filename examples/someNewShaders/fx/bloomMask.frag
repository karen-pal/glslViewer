#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord;       //
uniform sampler2D tex;     // texture one
uniform sampler2D tex2;    // texture two
//uniform vec2 tres;         // size of texture (screen)
uniform vec2 u_resolution;         // size of texture (screen)
uniform vec4 fparams;      // 4 floats coming in
uniform ivec4 iparams;     // 4 ints coming in
uniform float u_time;       // 0.0 to 1.0
//uniform int itime;         // increases when ftime hits 1.0
//f0:bloom level:
//f1:over bright:
//f2:bright ratio:

   float f0 = mix(0.05, 0.95, fract(u_time)+2.);
   float f1 = mix(0.05, 0.95, .5);
   float f2 = mix(0.05, 0.95, fract(u_time)*.5);

float time = u_time;
vec2 resolution = u_resolution;
//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/MtyXRh

void main( ) {
   float time = u_time;
vec2 uv = (gl_FragCoord.xy/u_resolution.xy);
    
    vec4 sample = texture2D(tex, uv);
   
    
    vec3 filterColorLevel = vec3(0.2126, 0.7152, 0.0722);
    float bloomLevel = f0;
    float softLevel = 0.3;
    float overbright = 1.5 /f1;
    float softFactor = 0.15;
    
    float brightenRatio = 1.0-dot(filterColorLevel, sample.rgb) /f2;
    float fade = step(brightenRatio, softLevel);
    float bloom = step(brightenRatio, bloomLevel);
    float fadedBloom = bloom*overbright-fade+fade*softFactor;
    gl_FragColor = sample*fadedBloom;        
}



