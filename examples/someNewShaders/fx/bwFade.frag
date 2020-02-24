// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
precision mediump float;
varying vec2 tcoord;// 
uniform sampler2D tex;// texture one
uniform sampler2D tex2;// texture two
uniform vec2 tres;// size of texture (screen)
uniform vec4 fparams;// 4 floats coming in 
uniform ivec4 iparams;// 4 ints coming in
uniform float ftime;// 0.0 to 1.0
uniform int itime;// increases when ftime hits 1.0
//f0:BW amount
//f1::
//f2::

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);


float time = float(itime) + ftime;

float cRange = 256.00/12.0;
float cValue = 0.0;
float cColor = 0.0;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/Xl3SDn

void main(void) {
vec2 uv = gl_FragCoord.xy / tres.xy;
gl_FragColor = texture2D(tex, gl_FragCoord.xy / tres.xy);
    
    cColor = f0 + 0.5*sin(time);
    cValue = max(max(gl_FragColor.x,gl_FragColor.y),gl_FragColor.z);
    
    gl_FragColor.x = mix(gl_FragColor.x,cValue,cColor);
    gl_FragColor.y = mix(gl_FragColor.y,cValue,cColor);
    gl_FragColor.z = mix(gl_FragColor.z,cValue,cColor);

} //endof main




