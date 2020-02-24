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
//f0:pixellation:
//f1:circle radius:
//f2:bg rays:
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.2, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

#define PI 3.1415926535897932384626
float time = float(itime) + ftime;

vec2 pixelate ( vec2 pixel, vec2 details ) { return floor(pixel * details) / details; }
float luminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/lsd3zj
void main(void) {

    // Get normalized texture coordinates
    vec2 uv = gl_FragCoord.xy / tres.xy;
    
    // Aspect ratio fix
   uv.x -= 0.5;
    uv.x *= tres.x / tres.y;
    uv.x += 0.5;
    
    // Pixelate
   uv = pixelate(uv, tres.xy * f0);
    
    // Maths infos about the current pixel position
    vec2 center = uv - vec2(0.5);
    float angle = atan(center.y, center.x);
    float radius = length(center) * f1;
    float ratioAngle = (angle / PI) * 0.5 + 0.5;
    
    // Displacement from noise
    vec2 angleUV = mod(abs(vec2(0, angle / PI)), 1.0);
    float offset = texture2D(tex2, angleUV).r * 0.5;
    
    // Displaced pixel color
    vec2 p = vec2(cos(angle), sin(angle)) * offset + vec2(0.5);
    
    // Apply displacement
    uv = mix(uv, p*f2, step(offset, radius));
    
    // Get color from texture
    vec3 color = texture2D(tex, uv).rgb;

    // Treshold color from luminance
    float lum = luminance(color);    
    color = mix(vec3(0), vec3(1,0,0), step(0.45, lum));
    color = mix(color, vec3(1,1,0), step(0.65, lum));
    color = mix(color, vec3(1,1,1), step(0.85, lum));
    
    // Voila
gl_FragColor = vec4(color,1.0);

} //endof main




