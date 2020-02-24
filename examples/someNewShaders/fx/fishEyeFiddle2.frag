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
//f0:ridges:
//f1:y pos:
//f2::

   float f0 = mix(0.2, 1.0, fparams[0]);
   float f1 = mix(0.0, 1.0, fparams[1]);
   float f2 = mix(0.0, 1.0, fparams[2]);

float time = float(itime) + ftime;

vec2 mapping(vec2 p) {
    float org_fov = radians(90.0);
    float focal_length = (-0.5+sin(time * 2.0)) * 0.34;

    float theta = length(2.0/f0*p)*org_fov*0.5;
    
    // displacement
    float r = focal_length * sin(theta);
    
    return p + normalize(p)*r;
}

vec2 mapping2(vec2 p) {
    float L = length(p);
    float w = 0.01;
    float r = 6.164 / pow(L*45./w,0.8) - 0.164;
    return p + normalize(p)*r;
}

vec2 mapping3(vec2 p) {
    float focal_length = (-0.5+sin(time * 2.0)) * 0.034;

    float theta = 14.0*length(p);
    
    // displacement
    float r = focal_length * sin(theta);
    
    return p + normalize(p)*r;
}

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/MlXXD7

void main(void) {

    vec2 uv = gl_FragCoord.xy / tres.xy;
    float aspectRatio = tres.x / tres.y;

    vec2 coords = uv;
    coords = coords - 0.5;
    coords.x *= aspectRatio;

   coords.y += 1. - f1; 

    vec2 xy = mapping(coords);

    gl_FragColor = texture2D(tex, 20.5+xy);


} //endof main



