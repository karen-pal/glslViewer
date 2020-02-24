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
// https://www.shadertoy.com/view/ltS3R3  (loosely based)
void main(void) {

    vec2 uv = tcoord.xy;


    float modder  = abs(ftime - 0.5) * 0.25 + 3.0;

    //float modder  = time * 0.5 ;
// 1.2   2.0   0.5
    float magR = -1.2 / modder;
    float magG = 2.0 / modder; 
    float magB = 0.5 / modder;
    
    vec4 shiftTex = texture2D(tex, tcoord );
    vec2 shR = vec2( uv.x + (shiftTex.x * magR), uv.y + (shiftTex.x * magR) );
    vec2 shG = vec2( uv.x + (shiftTex.y * magG), uv.y + (shiftTex.y * magG) );
    vec2 shB = vec2( uv.x + (shiftTex.z * magB), uv.y + (shiftTex.z * magB) );
    
    
    vec4 result = vec4(0.0, 0.0, 0.0, 1.0);
    
    result.r = texture2D( tex, -shR ).r;
    result.g = texture2D( tex, -shG ).g;
    result.b = texture2D( tex, -shB ).b;
    
    gl_FragColor = result;



//vec4 v = texture2D(tex,tcoord);
//gl_FragColor = v;

} //endof main




