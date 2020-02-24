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
//f0:pixel width:
//f1:pixel height:
//f2:threshold:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.35, 0.65, fparams[2]);

float time = float(itime) + ftime;

float baseline_alpha = 0.10 *f0;//the alpha value of dots in their "off" state, does not affect the border region of the screen - [0, 1]
float response_time = 0.333 +f1 *.024;//simulate response time, higher values result in longer color transition periods - [0, 1]

vec3 bg_col = vec3(0.63, 0.67, 0.02);
vec3 fg_col = vec3(0.11, 0.42, 0.42);

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/ldcXDr

void main(void) {

    float vx_offset = 1.5;// Horizontal limit of where to stop the effect
    float pixel_w = 20.0 / f0;// Pixelise width
    float pixel_h = 20.0 / f1;// Pixelise height
    
    vec2 uv = gl_FragCoord.xy / tres.xy;
    vec2 sampleSize = vec2(1.0 / tres.x, 1.0 / tres.y);
    vec3 color = vec3(1.0, 0.0, 0.0);
    
    if (uv.x < (vx_offset - 0.005)) {
        float dx = pixel_w * sampleSize.x;
        float dy = pixel_h * sampleSize.y;
        vec2 coord = vec2(dx * floor(uv.x/dx), dy * floor(uv.y/dy));
        color = texture2D(tex, coord).rgb;
    }
    else if (uv.x >= (vx_offset + 0.005)) {
        color = texture2D(tex, uv).rgb;
    }
    
    //Check if luminosity too high and higher luminosity = apply bg_color else apply fg
    if (dot(color, vec3(1.0, 1.0, 1.0)) > 0.9 / f2 ) {
        color = bg_col;
    } else  {
        color = fg_col;
gl_FragColor = vec4(color, 1.0);
   }

} //endof main




