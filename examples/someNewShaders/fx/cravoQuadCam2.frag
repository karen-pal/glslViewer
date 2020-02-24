// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord;// 
uniform sampler2D tex;// texture one
uniform sampler2D tex2;// texture two
uniform vec2 u_resolution;// size of texture (screen)
uniform vec4 fparams;// 4 floats coming in 
uniform ivec4 iparams;// 4 ints coming in
uniform float u_time;// 0.0 to 1.0
uniform int itime;// increases when ftime hits 1.0
//f0:threshold:
//f1:width:
//f2::

float f0 = mix(0.05, 0.95, abs(sin(u_time))*.4);
float f1 = mix(0.05, 0.95, sin(u_time));
float f2 = mix(0.05, 0.95, cos(u_time));

float time = u_time;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/lt2XDz

void main(void) {

    vec2 uv = gl_FragCoord.xy / u_resolution.xy ;
    
    vec3 col = texture2D(tex,uv).xyz;
    vec3 greyMul = vec3(0.2989, 0.5870, 0.1140);
    vec3 greyCol = col * greyMul;
    float grey = greyCol.x + greyCol.y + greyCol.z;
    //float threshold = 0.5 + 0.5 * sin(time * 8.0);
    float threshold =f0;
    float width = 0.4 * f1;

    if ( grey > threshold - width && grey < threshold + width ) {
        float u = mod(uv.x * 2.0, tan(u_time));

				if (u >0.49999) { u = 1.0 - u; }
				float v = mod(uv.y * 2.0, tan(u_time));

				if (v >0.49999) { v = 1.0 - v; }
				col = texture2D(tex,vec2(u,v)).xyz;// - vec3(.3); //* vec3(uv,0.5+0.5*sin(time * 4.0));
		}
        
    gl_FragColor = vec4(col,1.0);

} //endof main



