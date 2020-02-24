#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord;       //
uniform sampler2D tex;     // texture one
uniform sampler2D tex2;    // texture two
uniform vec2 u_resolution;         // size of texture (screen)
uniform vec4 fparams;      // 4 floats coming in
//uniform ivec4 iparams;     // 4 ints coming in
uniform float u_time;       // 0.0 to 1.0
//uniform int itime;         // increases when ftime hits 1.0
//f0::
//f1::
//f2::

float f0 = mix(0.05, 0.95, abs(sin(fparams[0]*u_time)));
float f1 = mix(0.05, 0.95, abs(sin(fparams[1]*u_time)));
float f2 = mix(0.05, 0.95, abs(sin(fparams[2]*u_time)));
float f3 = mix(0.05, 0.95, abs(sin(fparams[3]*u_time)));

float time =  u_time;

//---------------------------------------------------------------------------------------------------
void main( ) {
   float time =  u_time;

   // distance from center of image, used to adjust blur
//vec2 uv = tcoord.xy / tres.xy;
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
float d = length(uv - vec2(0.5,0.5));

// blur amount
//float blur = 0.02;
 float blur = (1.0 + sin(u_time*6.0)) * f0;

    float myTime = time;
    
    vec2 myuv =  vec2(uv.x + sin( (uv.y + sin(myTime)) * abs(sin(myTime) + sin(2.0 * myTime) + sin(0.3 * myTime) + sin(1.4 * myTime) + cos(0.7 * myTime) + cos(f3 * myTime)) * 4.0 ) * 0.02,uv.y);
    
// final color
    vec3 col;
    col.r = texture2D( tex, vec2(myuv.x+blur,myuv.y) ).r;
    col.g = texture2D( tex, myuv ).g;
    col.b = texture2D( tex, vec2(myuv.x-blur,fract(myuv.y)) ).b;

    col *= vec3(f2);
// scanline
float scanline = fract(uv.y*400.0*f1);
col -= scanline;


    gl_FragColor = vec4(col,1.0);
}



