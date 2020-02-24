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
//f2:cut off:

   float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

vec2 pixel_size = vec2(6.0/f0,12.0/f1); // width,height
float colour_count = 32. * f2; //ish, it roughly works

vec2 pixelate (vec2 uv) {
  vec2 d = pixel_size * (1.0/tres.xy);
  vec2 coord = vec2(d.x*(floor(uv.x/d.x) + (ceil(uv.x/d.x) - floor(uv.x/d.x))/2.0),
                    d.y*(floor(uv.y/d.y) + (ceil(uv.y/d.y) - floor(uv.y/d.y))/2.0));
  return coord;
}

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/Msc3Rr

void main(void) {

    vec2 uv = gl_FragCoord.xy / tres.xy;

    uv.x *= 1.035;
    vec4 factor = vec4(colour_count); //100*(2*(abs(0.5-fract(time/200))));
    gl_FragColor = ceil(texture2D(tex, pixelate(uv))*factor)/factor;

gl_FragColor.a = 1.0;

} //endof main



