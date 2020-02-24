varying vec2 tcoord;       //
uniform sampler2D tex;     // texture one
uniform sampler2D tex2;    // texture two
uniform vec2 u_resolution;         // size of texture (screen)
uniform vec4 fparams;      // 4 floats coming in
uniform ivec4 iparams;     // 4 ints coming in
uniform float u_time;       // 0.0 to 1.0
uniform int itime;         // increases when ftime hits 1.0
//f0:level:
//f1::
//f2::

   float f0 = mix(0.0, 1.0, sin(u_time));
   float f1 = mix(0.0, 1.0, (u_time));
   float f2 = mix(0.0, 1.0, fparams[2]);

//---------------------------------------------------------------------------------------------------
void main() {
  
   vec2 uv = gl_FragCoord.xy / u_resolution.xy ;
   vec4 base  = texture2D(tex, uv.xy);
   vec4 blend = texture2D(tex2, uv.xy*f1);

   vec3 s = base.rgb;// * f0;
   vec3 d = blend.rgb*f0;

   vec3 r = s + d - 1.0;

   gl_FragColor=vec4(r,1.0);

}
