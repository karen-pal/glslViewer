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
//f0:spin:
//f1:zoom:
//f2:squash:

   float f0 = mix(0.05, 0.95, fparams[0]);
   float f1 = mix(0.3, 0.5, fparams[1]);
   float f2 = mix(0.5, 1., fparams[2]);

float time = float(itime) + ftime;

vec2 mirror(vec2 x) {
return abs(fract(x/2.0) - 0.5)*4.0 *f1;
}

//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/XsfGzj

void main( ) {
   float time = float(itime) + ftime;

vec2 uv = -1.0 + 2.0*gl_FragCoord.xy / tres.xy;

float a = time*0.2;

for (float i = 1.0; i < 5.0; i += 1.0) {
uv = vec2(sin(a)*uv.y - cos(a)*uv.x *f2, sin(a)*uv.x + cos(a)*uv.y);
uv = mirror(uv);

// These two lines can be changed for slightly different effects
// This is just something simple that looks nice
a += i *f0;
a /= i;

}

gl_FragColor = texture2D(tex, mirror(uv*2.0));

}



