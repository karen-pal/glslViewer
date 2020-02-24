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
//f0:intensity:
//f1:size:
//f2:threshold:

   float f0 = mix(0.0, .25, fparams[0]);
   float f1 = mix(0.0, 1.0, fparams[1]);
   float f2 = mix(0.0, .5, fparams[2]);

float time = float(itime) + ftime;
vec2 resolution = tres;

vec4 BlurColor (in vec2 Coord, in sampler2D Tex, in float MipBias) {
vec2 TexelSize = MipBias/tres.xy;
    
    vec4  Color = texture2D(Tex, Coord, MipBias);
    Color += texture2D(Tex, Coord + vec2(TexelSize.x,0.0), MipBias);    
    Color += texture2D(Tex, Coord + vec2(-TexelSize.x,0.0), MipBias);    
    Color += texture2D(Tex, Coord + vec2(0.0,TexelSize.y), MipBias);    
    Color += texture2D(Tex, Coord + vec2(0.0,-TexelSize.y), MipBias);    
    Color += texture2D(Tex, Coord + vec2(TexelSize.x,TexelSize.y), MipBias);    
    Color += texture2D(Tex, Coord + vec2(-TexelSize.x,TexelSize.y), MipBias);    
    Color += texture2D(Tex, Coord + vec2(TexelSize.x,-TexelSize.y), MipBias);    
    Color += texture2D(Tex, Coord + vec2(-TexelSize.x,-TexelSize.y), MipBias);    

    return Color/9.0;
}

//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/Ms2Xz3
void main( ) {
   //float Intensity = 40.0*sin(10.0*time);
   //float BlurSize = 10.0*cos(40.0*time);

   float Intensity = 40.0*f0;
   float BlurSize = 10.0*f1;
   float Threshold = f2;

vec2 uv = (gl_FragCoord.xy/tres.xy);
    
    vec4 Color = texture2D(tex, uv);
    
    vec4 Highlight = clamp(BlurColor(uv, tex, BlurSize)-Threshold,0.0,1.0)*1.0/(1.0-Threshold);
        
    gl_FragColor = 1.0-(1.0-Color)*(1.0-Highlight*Intensity); //Screen Blend Mode

}



