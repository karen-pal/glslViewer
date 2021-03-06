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
//f1:vert stretch:
//f2:image offset:
float f0 = mix(0.3, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

vec2 smRes = tres * 0.003;//for shadertoy compat

vec2 refl(vec2 p,vec2 o,vec2 n) {
return 2.0*o+2.0*n*dot(p-o,n)-p;
}

vec2 rot(vec2 p, vec2 o, float a) {
    float s = sin(a);
    float c = cos(a);
return o + mat2(c, -s, s, c) * (p - o);
}

//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/MljXDt
void main(void) {

    vec2 coo = tcoord;

    float l = sqrt(4.0/3.0);
    vec2 uv = (coo - smRes.xy*0.5)/min(smRes.x,smRes.y);
    uv = uv*16.0 *vec2(f0,f1);
    uv.y = abs(fract((uv.y-1.0)*0.5)*2.0-1.0);
    uv.x = fract(uv.x/l/3.0)*l*3.0;
    if(uv.y < 2.0*uv.x/l) uv = refl(uv, vec2(0), vec2(0.5, sqrt(0.75)));
    if(uv.y > 1.0) uv = refl(uv, vec2(0.0, 1.0), vec2(1.0, 0.0));
    if(uv.y < -2.0*uv.x/l) uv = refl(uv, vec2(0), vec2(-0.5, sqrt(0.75)));

    if(uv.y < 2.0*uv.x/l) uv = refl(uv, vec2(0), vec2(0.5, sqrt(0.75)));
    if(uv.y > 1.0) uv = refl(uv, vec2(0.0, 1.0), vec2(1.0, 0.0));
    if(uv.y < -2.0*uv.x/l) uv = refl(uv, vec2(0), vec2(-0.5, sqrt(0.75)));
    uv.x = -uv.x*tres.y/tres.x + 0.5;
    uv = rot(uv, vec2(f2), time);

    vec4 c = texture2D(tex, uv);
    c = floor(c*5.0)*0.25;
c.a =  1.0;

gl_FragColor = c;

} //endof main




