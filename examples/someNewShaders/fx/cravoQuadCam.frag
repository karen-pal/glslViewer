// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord;       //
uniform sampler2D tex;     // texture one
uniform sampler2D tex2;    // texture two
uniform vec2 u_resolution;         // size of texture (screen)
uniform vec4 fparams;      // 4 floats coming in
uniform ivec4 iparams;     // 4 ints coming in
uniform float u_time;       // 0.0 to 1.0
uniform int itime;         // increases when ftime hits 1.0
//f0:threshold:
//f1:grey adjust:
//f2:tolerance:

float f0 = mix(0.05, 0.95, sin(.5));
float f1 = mix(0.05, 0.95,  fract(.5));
float f2 = mix(0.05, 0.95, sin(.5));

float time = u_time;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/lt2XDz

void main(void) {

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    //uv.x = 1.0 - uv.x;

    //float tolerance = 0.2 + (2.*f1-1.) * 0.1;
    float tolerance = 0.2 / f2;
    
    vec3 col = texture2D(tex,uv).xyz;
    vec3 greyMul = vec3(0.2989, 0.5870, 0.1140) *  (f1 + 0.5);
    vec3 greyCol = col * greyMul * abs(sin(u_time));
    float grey = greyCol.x + greyCol.y + greyCol.z;
    float threshold = 0.5 ;//+ 0.5 * f0; //sin(time * 2.0);

    if ( grey > threshold - tolerance && grey < threshold + tolerance ) {
        float u = pow(uv.x * 4.0, 2.0);
        float v = pow(uv.y * 4.0, 2.0);
        col = texture2D(tex,vec2(u,v)).xyz - vec3(.4); //* vec3(uv,1.0);
    }
        
    gl_FragColor = vec4(col,1.0);

} //endof main



