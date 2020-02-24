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
//f0:erode:
//f1:bg offset:
//f2:rotate:

float f0 = mix(0.05, 0.5, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

vec2 rotate(vec2 coords, float angle){
    float sin_factor = sin(angle );
    float cos_factor = cos(angle );
    coords = vec2((coords.x - 0.5) , coords.y - 0.5) * mat2(cos_factor, sin_factor, -sin_factor, cos_factor);
    coords += 0.5;
    return coords;
}

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/XssfDH  (doesn't do much but posterize, but potential)

void main(void) {

    vec2 res = tres.xy;
    float t = time*0.01;
    vec2 tc = gl_FragCoord.xy / res.xy;
    vec2 uv = tc;
    
    //zoom 
    uv *= 0.9998;
    
    //rotation
    uv = rotate(uv,  (4.*f2-2.));
    
    vec4 sum = texture2D(tex, uv);//tex2
 
    vec4 color = texture2D(tex, uv - sum.gb *f1); //tex2
    sum += color * -0.1 /f0;
    
    vec4 src = texture2D(tex, tc);
    sum.rgb = mix(sum.rgb, src.rgb, src.rgb*0.15);

    gl_FragColor = vec4(clamp(vec3(sum.rgb), vec3(0.0), vec3(1.0)), 1.0);

} //endof main




