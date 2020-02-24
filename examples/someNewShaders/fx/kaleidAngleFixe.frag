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
//f0:count fixed:
//f1:bend:
//f2:zoom:

    float f0 = mix(0.05, 1., fparams[0]);
    float f1 = mix(0.05, 1., fparams[1]);
    float f2 = mix(0.05, 1., fparams[2]);

#define PI 3.1415926535897932384626
float time = float(itime) + ftime;

#define TWO_PI PI * 2.0

//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/XdGXRG

void main(void) {

    float sides = floor(30. * f0) + 2.;
    vec2 uv = gl_FragCoord.xy / tres.xy;
    vec2 p = uv - 0.5;

    // Convert from cartesian coordinates to polar coordinates
    float r = length(p);
    float angle = atan(p.y, p.x);

    // Kaleidoscope effect
    angle = mod(angle, TWO_PI/sides) * f1;
    //angle = abs(angle - PI/sides);

    int lock = int(angle);
    // Convert from polar coordinates to cartesian coordinates
    p = r * vec2(cos(angle), sin(angle)) * f2;

    // Final color
    gl_FragColor = texture2D(tex, p - cos(time)/2.0);


} //endof main



