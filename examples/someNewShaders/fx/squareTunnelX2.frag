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
void main(void) {
    vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / tres.xy;
    vec2 uv;
    float points= 16.;
    float r = pow( pow(p.x*p.x,points) + pow(p.y*p.y,points), 1.0/(2.*points) );
    uv.x = .5*time + 0.5/r;// +/- is dir
    uv.y = 1.0*atan(p.y,p.x)/3.1416;//x,y seam @ top y,x seem on side

    vec3 col =  texture2D(tex,uv).xyz;

    gl_FragColor = vec4(col*r,1.0);
}



