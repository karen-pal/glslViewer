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
//f0:frequency:
//f1:amplitude:
//f2:pixellate:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// URL:  https://github.com/genekogan/Processing-Shader-Examples/blob/master/TextureShaders/data/pixelrolls.glsl

void main(void) {
   vec2 pixels = tres * f2;
   float rollRate = 0.15 * f0;
   float rollAmount = 0.3 * f1;
   vec2 p = tcoord;
   p.x -= mod(p.x, 1.0 / pixels.x);
   p.y -= mod(p.y, 1.0 / pixels.y);
   p.y = mod(p.y + rollAmount * sin(rollRate * time * p.x + p.x), 1.0);
   gl_FragColor = vec4(texture2D(tex, p).rgb, 1.0);
}



