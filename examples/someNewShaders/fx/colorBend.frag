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
//f2:bright radius:

   float f0 = mix(0.05, 0.95, fparams[0]);
   float f1 = mix(0.05, 0.95, fparams[1]);
   float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;
vec2 resolution = tres;

//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/Xt2XRR

void main(void) {
    float t = 5.0*(float(itime) + ftime);

    vec2 p = gl_FragCoord.xy; 

    p /= tres.xy;

    vec4 col = vec4(1.0);
    
    col.rgb = vec3(texture2D(tex, p).r, texture2D(tex, p - 0.025 + cos(t + p.y + p.x)*0.1).g, texture2D(tex, p + 0.04  + sin(t + p.y + p.x)*0.1).b);
col.rgb *= 1.75;
    
    float a = t*0.25;
    
    col.gb -= texture2D(tex, (p + length(p) ) * mat2(cos(a), -sin(a), 
                        sin(a), cos(a))).gb*0.15 + length(p - 0.5);
    
    col.rgb -= length(p - vec2(f0,f1)) * 0.75 /f2;

    gl_FragColor = col;
}




