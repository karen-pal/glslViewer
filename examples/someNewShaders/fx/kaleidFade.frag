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
//f0:zoomt:
//f1:source:
//f2:shift:

   float f0 = mix(0.05, 0.95, fparams[0]);
   float f1 = mix(0.05, 0.95, fparams[1]);
   float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

vec2 mirror(vec2 x) {
return abs(fract(x/2.0) - f2)*2.0;
}

//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/XsfGzj

void main( ) {
   float time = float(itime) + ftime;

   vec2 uv = -1.0 + 2.0*gl_FragCoord.xy / tres.xy ;

float a = time*0.2;
vec4 color = vec4(0.0);
for (float i = 1.0; i < 4.0; i += 1.0) {
//uv = vec2(sin(a)*uv.y - cos(a)*uv.x, sin(a)*uv.x + cos(a)*uv.y) * f1;
uv = vec2(uv.y - uv.x, uv.x + uv.y) * vec2(f0); 
uv = mirror(uv) * f1;

// These two lines can be changed for slightly different effects
// This is just something simple that looks nice
a += i *f0;
a *= i;
color += texture2D(tex, mirror(uv*2.0)) * 10.0/i;
}

gl_FragColor = color / 14.289;


}



