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
//f0:x offset:
//f1:y offset:
//f2:count:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
void main(void) {
    vec2 uv;

    vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / tres.xy;
    float a = atan(p.y,p.x) *f2;
    float r = sqrt(dot(p,p));
    float s = r * (1.0+0.8*cos(time*1.0));

    uv.x =          .02*p.y+.03*cos(-time+a*3.0)/s / f0;
    uv.y = .1*time +.02*p.x+.03*sin(-time+a*3.0)/s / f1;

    float w = .9 + pow(max(1.5-r,0.0),4.0);

    w*=0.6+0.4*cos(time+3.0*a);

    vec3 col =  texture2D(tex,uv).xyz;

    gl_FragColor = vec4(col*w,1.0);
}



