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
//f0:horz bright:
//f1:vert brigth:
//f2:line thickness:

   float f0 = mix(0.05, 0.95, fparams[0]);
   float f1 = mix(0.05, 0.95, fparams[1]);
   float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;
//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/XsdGD8

void main(void) {

    float h_thick = 10.0;
    float v_thick = 10.0;

    vec2 uv = (gl_FragCoord.xy / tres.xy);
    vec4 tex = texture2D(tex, uv);
    float vcol = v_thick*(mod(gl_FragCoord.y/12.,1.)-.45*f2) *f0;
    float hCol = h_thick*(mod(gl_FragCoord.x/12.,1.)-.55*f2) *f1;
    float gray = hCol;
    if(tex.r>0.5) {
      gray = vcol;
    }
    gl_FragColor = vec4(vec3(gray),1.0);
} //endof main




