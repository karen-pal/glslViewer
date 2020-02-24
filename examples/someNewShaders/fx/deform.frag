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
//f0:horz stretch:
//f1:vert roll:
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

//---------------------------------------------------------------------------------------------------
float time = float(itime) + ftime;

void main(void) {
    //vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / tres.xy;//orig
    vec2 p = 3.0 * gl_FragCoord.xy / tres.xy;
    vec2 uv;

    float an = time*.25;

    float x = p.x*cos(an)-p.y*sin(an)-atan(time);
    float y = p.x*sin(an)+p.y*cos(an)+atan(time);
     
    uv.x = .35*x/abs(y) * f0;
    uv.y = .10*y+.05/abs(y*f1);

    gl_FragColor = vec4(texture2D(tex,uv).xyz * y, 1.0);
}



