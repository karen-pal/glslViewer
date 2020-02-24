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
// https://www.shadertoy.com/view/XsX3z8
void main(void) {

    vec2 p = gl_FragCoord.xy/tres.xy;
    
vec4 col = texture2D(tex, p);

//Desaturate
    if(p.x<.25) {
col = vec4( (col.r+col.g+col.b)/3. );
}
//Invert
else if (p.x<.5) {
col = vec4(1.) - texture2D(tex, p);
}
//Chromatic aberration
else if (p.x<.75) {
vec2 offset = vec2(.01,.0);
col.r = texture2D(tex, p+offset.xy).r;
col.g = texture2D(tex, p          ).g;
col.b = texture2D(tex, p+offset.yx).b;
}
//Color switching
else {
col.rgb = texture2D(tex, p).brg;
}

//Line
if( mod(abs(p.x+.5/tres.y),.25)<1./tres.y )
col = vec4(1.);

col.a = 1.0;
    gl_FragColor = col;

} //endof main




