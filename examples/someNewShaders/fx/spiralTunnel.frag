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
//f0:count:
//f1::
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// http://www.glslsandbox.com/e#43440.0

void main(void) {

   vec2 p = (gl_FragCoord.xy - tres/ 2.) / tres.x;
   float c = 0.;
   
   float l = 1. / length(p) * f0;
   p = vec2(9. * atan(p.y, p.x) / (4. * asin(1.)), l);
   p.y += p.x / 3. + 2. * time;
   p.y /= 3.;
   c = mod(floor(p.x) + floor(p.y), 1.);
   c = mix(c, texture2D(tex, (fract(vec2(p.y, -p.x)))).x, 0.8);
   c == pow(0.6, l / log(tres.x));
   
   gl_FragColor = vec4(c);

} //endof main



