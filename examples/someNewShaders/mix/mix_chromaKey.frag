
varying vec2 tcoord;       //
uniform sampler2D tex;     // texture one
uniform sampler2D tex2;    // texture two
uniform vec2 u_resolution;         // size of texture (screen)
uniform vec4 fparams;      // 4 floats coming in
uniform ivec4 iparams;     // 4 ints coming in
uniform float u_time;       // 0.0 to 1.0
uniform int itime;         // increases when ftime hits 1.0
//f0:key color:
//f1:key range:
//f2:edge opacity:

   float f0 = mix(0.0, 1.0, sin(u_time));
   float f1 = mix(0.0, 0.5, sin(u_time));
   float f2 = mix(0.0, 1.0, cos(u_time));

//---------------------------------------------------------------------------------------------------

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}



void main() {

   vec2 uv = gl_FragCoord.xy / u_resolution.xy ;
   vec3 outc;
   vec4 base  = texture2D(tex, uv.xy)*sin(u_time)+.2;
   vec4 blend = texture2D(tex2, uv.xy*(fract(u_time)-.5));

   vec3 hsv = rgb2hsv(base.rgb);

   if( (hsv.x > (f0-f1)) && (hsv.x < (f0+f1)) ){
      if(hsv.x-(f0-f1) < f2){
         outc = mix(base.rgb,blend.rgb,(hsv.x-(f0-f1))/f2);
      } else if((f0+f1)-hsv.x < f2){
         outc = mix(base.rgb,blend.rgb,((f0+f1)-hsv.x)/f2);
      } else {
         outc = blend.rgb;
      }


   } else {
      outc = base.rgb;
   }




   gl_FragColor=vec4(outc,1.0);

}

