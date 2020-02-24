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
//f0:horz mod:
//f1:vert mod:
//f2:cut off:

float f0 = mix(0.05, 0.4995, fparams[0]);
float f1 = mix(0.5, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/XsdGD8

void main(void) {

    vec2 uv = (gl_FragCoord.xy / tres.xy);
    vec4 tex = texture2D(tex, uv);

    float vcol = 20.*(mod(gl_FragCoord.y/5.,1.)-uv.y * f1); // / (2. * f1 - 1.));
    float hCol = 20.*(mod(gl_FragCoord.x/5.,1.)-uv.x * f0); // / (2. * f0 - 1.));

    float gray = hCol;
    if(tex.r> f2 ) {
      gray = vcol;
    }
    gl_FragColor = vec4(vec3(gray),1.0);


} //endof main




