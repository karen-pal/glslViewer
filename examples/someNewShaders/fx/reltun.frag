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

//f0:ridge count:
//f1:screen copies:
//f2:zoom:
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
void main(void) {
    vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / tres.xy;
    vec2 uv;

    float r = sqrt( dot(p,p/f2) );
    float a = atan(p.y,p.x) + 0.5*sin(0.5*r-0.5*time);

    float s = 0.5 + 0.5*cos(8.*f0*a);
    s = smoothstep(0.0,1.0,s);

    uv.x = time + 1.0/( r + .2*s);
    uv.y = 8.*f1*a/3.1416;//num scrn

    float w = (0.5 + 0.5*s)*r*r;

    vec3 col = texture2D(tex,uv).xyz;

    float ao = 0.5 + 0.5*cos(7.0*a);
    ao = smoothstep(0.0,0.4,ao)-smoothstep(0.4,0.8,ao);
    ao = 1.0-0.5*ao*r;

    gl_FragColor = vec4(col*w*ao,1.0);
}



