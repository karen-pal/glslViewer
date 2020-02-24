// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
precision mediump float;
precision mediump float;
varying vec2 tcoord;// 
uniform sampler2D tex;// texture one
uniform sampler2D tex2;// texture two
uniform vec2 tres;// size of texture (screen)
uniform vec4 fparams;// 4 floats coming in 
uniform ivec4 iparams;// 4 ints coming in
uniform float ftime;// 0.0 to 1.0
uniform int itime;// increases when ftime hits 1.0
//f0:width:
//f1:line spacing:
//f2:cutoff:

float f0 = mix(0.10, 1.00, fparams[0]);
float f1 = mix(0.00, 0.10, fparams[1]);
float f2 = mix(-0.6, 0.2, fparams[2]);

float time = float(itime) + ftime;



//---------------------------------------------------------------------------------------------------
void main(void) {
vec4 c;

vec2 cart = 2.0*(tcoord-0.5);

float ra = tres.x/tres.y;
float xm = sin(mod(cart.x*ra,f0));
float ym = 1.0+cos(mod(cart.y,f0));
if(xm<.005+f1 || ym<0.005+f1){
c = vec4(0.0,0.0,0.0,1.0);
} else {

c = texture2D(tex,tcoord-vec2((xm/ra)/2.,ym/2.));
if(length(c)>1.1-f2){
c=vec4(0.0);
}

    
}   
gl_FragColor = c;
} //endof main




