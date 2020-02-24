// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord;       //
uniform sampler2D tex;     // texture one
uniform sampler2D tex2;    // texture two
uniform vec2 u_resolution;         // size of texture (screen)
uniform vec4 fparams;      // 4 floats coming in
uniform ivec4 iparams;     // 4 ints coming in
uniform float u_time;       // 0.0 to 1.0
uniform int itime;         // increases when ftime hits 1.0
//f0:pixel width:
//f1:pixel height:
//f2:diag zoom:

float f0 = mix(0.0, 1.0, fract(u_time));
float f1 = mix(0.0, 1.0, sin(u_time));
float f2 = mix(0.0, 1.0, .5);

//---------------------------------------------------------------------------------------------------
//http://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/

void main(void) {
                float rt_w = u_resolution.x;
                float rt_h = u_resolution.y;


                float pixel_w = 10.0 * sin(0.0) + 25.0 * f2;
                float pixel_h = 10.0 * cos(0.0) + 25.0 * f2;

                vec2 uv = gl_FragCoord.xy/u_resolution.xy;
                vec3 tc = vec3(1.0, 0.0, 0.0);

                float dx = pixel_w * (2.0*f0/rt_w);
                float dy = pixel_h * (2.0*f1/rt_h);
                vec2 coord = vec2(dx*floor(uv.x/dx), dy*floor(uv.y/dy));
                tc = texture2D(tex, coord).rgb;

                gl_FragColor = vec4(tc, 1.0);

} //endof main



