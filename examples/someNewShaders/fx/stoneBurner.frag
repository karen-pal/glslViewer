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
//f0:corner scale:
//f1:rotation:
//f2:bright offset:

float f0 = mix(0.5, 0.95, fparams[0]);
float f1 = mix(0.5, 0.95, fparams[1]);
float f2 = mix(-0.2, 0.5, fparams[2]);

// STONEBURNER effect inspired by Steven Archer

float time = float(itime) + ftime;



//---------------------------------------------------------------------------------------------------
void main(void) {
vec4 c1 = texture2D(tex,tcoord);

vec2 cart = 2.0*(tcoord-0.5);
float rotx =  (cart.x*cos(2.*3.14*f1)-cart.y*sin(2.*3.14*f1))/2.0 + 0.5;
float roty =  (cart.y*cos(2.*3.14*f1)+cart.x*sin(2.*3.14*f1))/2.0 + 0.5;
float aspect = tres.x/tres.y;

vec4 c2 = texture2D(tex,vec2(rotx/aspect,roty)*f0);
vec4 c=c1;
cart.x = cart.x*aspect;

float len = length(cart);
if(len<0.95 && len > 0.35){
c=c2+f2;
}

    gl_FragColor = c;

   
} //endof main



