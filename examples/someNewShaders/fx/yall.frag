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
//f0:angle:
//f1:dist:
//f2:offset:

float f0 = mix(0.0, 1.0, fparams[0]);
float f1 = mix(0.0, 1.0, fparams[1]);
float f2 = mix(0.3, 0.7, fparams[2]);

float time = float(itime) + ftime;

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/4d3GzB

void main(void) {
   vec2 uv = gl_FragCoord.xy / tres.xy;
    
    uv = uv*2.;
    uv = uv-1.;
    uv = abs(uv); 
    
    uv = uv-.3;
    
    float angle = atan(uv.y*2.,uv.x*2.0) * f0;
    float dist = length(uv) * f1;
    
    dist = dist+dist*sin(dist*20.+time)*.5;
    
    uv.y = sin(angle+time*.5)*dist;
    uv.x = cos(angle+time*.1)*dist;

    uv = uv+f2;
    
    vec4 color = texture2D(tex, abs(uv));
    color += texture2D(tex, uv);
                           
    //color += sin(color*10.+dist)*500.;
    
    
    color.rgb = sin((color.rgb+vec3(0.11,.88,.11))*6.28+time);
   
    
   color = mix(color,color,uv.x);
    
    uv.xy = uv.xy+color.rg*.1-.1;
    gl_FragColor = vec4(color);

} //endof main



