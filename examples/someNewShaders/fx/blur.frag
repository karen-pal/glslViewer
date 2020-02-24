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
//f0:width:
//f1:gauss:
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

const int blur_size = 4;  //orig 20
float blur_width = 1. / f0;

float gauss(float x, float e) {
            return exp(-pow(x, 2.)/e);
}

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/XstGWB   (horz, anyway)

void main(void) {

   vec2 pos = gl_FragCoord.xy / tres.xy;
   vec4 pixval = vec4(0.);
   float tot = 0.;

   const int nb = 2*blur_size+1;

   for (int x=0; x<nb; x++) {
       float x2 = blur_width*float(x-blur_size);
       vec2 ipos = pos + vec2(x2/tres.x, 0.);
       //float g = gauss(x2, float(20*blur_size)*(0.5+sin(time*2.)*0.5));
       float g = gauss(x2, float(20*blur_size)*(0.5+0.5)*f1);
       pixval+= g*texture2D(tex, ipos);
       tot+= g;
   }
   gl_FragColor = pixval/tot;

} //endof main




