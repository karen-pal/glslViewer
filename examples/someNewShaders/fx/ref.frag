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

//f0:x mod:
//f1:y mod:
//f2::
float f0 = mix(0.0, 1., fparams[0]);
float f1 = mix(0.0, 1., fparams[1]);
float f2 = mix(0.0, 1., fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
void main() {
    vec2 uv = tcoord/2.0;
    vec4 jc = texture2D(tex,tcoord);
    
    //uv -= vec2(1.05,.15);
    uv -= vec2(.50*f0,.80*f1);
    gl_FragColor = vec4(texture2D(tex, uv + jc.xz).rgb, jc.a);

}



