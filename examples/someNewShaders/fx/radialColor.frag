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
//f0::
//f1::
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/lltGW2

void main(void) {

    vec2 uv = gl_FragCoord.xy / tres.xy;
    vec4 c = texture2D(tex, uv);
    ///gl_FragColor = c;

    float z = (texture2D(tex, vec2(length(uv-.5),1.)).r)*(.5/tres.x*.2+.02);

    //float zoom = (1.-z);///sin(time*20.)*.1+.9;
    //uv-=.5;
    //uv*=zoom;
    //uv+=.5;

    c.rgb = sin(c.rgb*(6.2+.5/tres.y*20.)+time+vec3(3., 1.5,.5*texture2D(tex2, vec2(1.5*length(uv-.5),1.)).r))*.5+.5;
    c.a = 1.0;
    gl_FragColor = c;

} //endof main



