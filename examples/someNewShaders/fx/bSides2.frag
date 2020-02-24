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
//f2:radius:

   float f0 = mix(0.05, 0.95, fparams[0]);
   float f1 = mix(0.05, 0.95, fparams[1]);
   float f2 = mix(0.0, 0.4, fparams[2]);

float time = float(itime) + ftime;

#define PI 3.1415926535897932384626
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
    
    // Inverse texture coordinates
    //uv = 1.0;
    
    // Pixelate
   uv = pixelate(uv, tres.xy /0.5);
    
    // Maths infos about the current pixel position
    vec2 center = uv - vec2(f0,f1);
    float angle = atan(center.y, center.x);
    float radius = length(center) + (2. * f2 - 1.) + 0.25;
    float ratioAngle = (angle / PI) * 0.125 + (0.5  );
    
    // Displacement from noise
    vec2 angleUV = mod(abs(vec2(0, angle / PI)), 1.0);
    float offset = texture2D(tex2, angleUV).r * sin(time) * 0.5 + 0.25 ;
    
    // Displaced pixel color
    vec2 p = vec2(cos(angle), sin(angle)) * offset + vec2(0.125);
    
    // Apply displacement
    uv = mix(uv, p, step(offset, radius));
    
    // Get color from texture
    vec3 color = texture2D(tex, uv).rgb;

    // Treshold color from luminance
    float lum = luminance(color);    
    color = mix(vec3(0), vec3(1,0,0), step(0.25, lum));
    color = mix(color, vec3(0.5,0.5,0.5), step(0.65, lum));
    color = mix(color, vec3(1,1,1), step(0.75, lum));
    
gl_FragColor = vec4(color,1.0);

} //endof main




