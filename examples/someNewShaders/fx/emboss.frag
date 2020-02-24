// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord; // location
uniform sampler2D tex;  // texture one
uniform sampler2D tex2; // texture two
uniform vec2 u_resolution;   // size of texture (screen)
uniform vec4 fparams;   // 4 floats coming in
uniform ivec4 iparams;  // 4 ints coming in
uniform float u_time; // 0.0 to 1.0
uniform int itime;   // increases when ftime hits 1.0
//f0:sub:
//f1:add:
//f2:pixel size:
float f0 = mix(0.05, 0.95, abs(cos(u_time)));
float f1 = mix(0.05, 0.95, abs(sin(u_time)));
float f2 = mix(0.05, 0.95, cos(u_time));

float time = u_time;
vec2 resolution = u_resolution;

void main( void ) {
  vec2 onePixel = 2.0/u_resolution ;
	

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  vec4 color;
  color.rgb = vec3(0.5);
	color -= texture2D(tex, uv - onePixel) * f0;
  color += texture2D(tex, uv + onePixel) * f1;

  color.rgb = vec3((color.r + color.g + color.b) / 3.0);
  gl_FragColor = vec4(color.rgb, 1.);
}
