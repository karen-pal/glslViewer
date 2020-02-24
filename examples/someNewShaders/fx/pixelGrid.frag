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
//f0:grid scale:
//f1:grid width:
//f2::

float f0 = mix(0.02, 0.20, fparams[0]);
float f1 = mix(-0.05, 0.05, fparams[1]);
float f2 = mix(-0.2, 0.2, fparams[2]);

float time = float(itime) + ftime;



//---------------------------------------------------------------------------------------------------
void main(void) {
vec4 c;

vec2 cart = 2.0*(tcoord-0.5);

float ra = tres.x/tres.y;
float xm = mod(cart.x*ra,f0);
float ym = mod(cart.y,f0);
if(xm<.005+f1 || ym<0.005+f1){
gl_FragColor = vec4(0.0,0.0,0.0,1.0);
} else {

c = texture2D(tex,tcoord-vec2((xm/ra)/2.,ym/2.));

    gl_FragColor = c;
}   
} //endof main




