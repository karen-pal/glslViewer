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
//f0:horz shift:
//f1:vert shift:
//f2:luminance :

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
void main() {

   vec2 uv = tcoord;
   vec3 c = texture2D(tex,uv).rgb;

   float lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
   lum = lum * f2;
   uv.y = uv.y + lum + (2.0 *f1 -1.);
   uv.x = uv.x + lum + (2.0 *f0 -1.);
   gl_FragColor = texture2D(tex,uv);

}



