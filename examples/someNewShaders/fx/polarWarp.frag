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
//f0:x pos:
//f1:y pos:
//f2:zoom:

float f0 = mix(0.0, 1., fparams[0]);
float f1 = mix(0.0, 1., fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// URL:  https://gist.github.com/KeyMaster

void main() {
    vec2 relativePos = gl_FragCoord.xy - (tres.xy / 2.0) * 2. *vec2(f0,f1);
    vec2 polar;
    polar.y = sqrt(relativePos.x * relativePos.x + relativePos.y * relativePos.y);
    polar.y /= tres.x / 2.0;
    polar.y = 1.0 - polar.y *f2;

    polar.x = atan(relativePos.y, relativePos.x);
    polar.x -= 1.57079632679;
    if(polar.x < 0.0){
        polar.x += 6.28318530718;
    }
    polar.x /= 6.28318530718;
    polar.x = polar.x;
    
    vec4 c = texture2D(tex, polar);
    gl_FragColor = vec4(c);
}



