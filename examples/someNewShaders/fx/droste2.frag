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
//f0:zoom:
//f1:invert scale:
//f2:nearest:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.1, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);


float time = float(itime) + ftime;
const float TWO_PI = 3.141592*2.0;

//ADJUSTABLE PARAMETERS:
float branches = floor(8.0 * f0) + 2.;
//const float scale = 0.6125; // try different values :)
float scale = 1.9 / f1; // try different values :)
float speed = 8.0; 

//Complex Math:
vec2 complexExp(in vec2 z){
return vec2(exp(z.x)*cos(z.y),exp(z.x)*sin(z.y));
}

vec2 complexLog(in vec2 z){
return vec2(log(length(z)), atan(z.y, z.x));
}

vec2 complexMult(in vec2 a,in vec2 b){
return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

float complexMag(in vec2 z){
return float(pow(length(z), 2.0));
}

vec2 complexReciprocal(in vec2 z){
return vec2(z.x / complexMag(z), -z.y / complexMag(z));
}

vec2 complexDiv(in vec2 a,in vec2 b){
return complexMult(a, complexReciprocal(b));
}

vec2 complexPower(in vec2 a, in vec2 b){
return complexExp( complexMult(b,complexLog(a))  );
}

//Misc Functions:
float nearestPower(in float a, in float base){
return pow(base,  ceil(  log(abs(a))/log(base)  )-1.0 * f2 );
}

float map(float value, float istart, float istop, float ostart, float ostop) {
   return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

vec4 droste(in vec2 co){

//SHIFT AND SCALE COORDINATES TO <-1,1>
vec2 z = (co-0.5+sin(time*0.3)*0.35)*2.0;

//ESCHER GRID TRANSFORM:
float factor = pow(1.0/scale,branches);
z = complexPower(z, complexDiv(vec2( log(factor) ,TWO_PI), vec2(0.0,TWO_PI) ) ); 

//RECTANGULAR DROSTE EFFECT:
z *= 1.0+fract(time*speed)*(scale-1.0);
float npower = max(nearestPower(z.x,scale),nearestPower(z.y,scale));
z.x = map(z.x,-npower,npower,-1.0,.40);
z.y = map(z.y,-npower,npower,-1.0,.20);

//UNDO SHIFT AND SCALE:
z = z*0.5+0.5;

return texture2D(tex,z);

}

//---------------------------------------------------------------------------------------------------
//https://www.shadertoy.com/view/XdjSRK

void main(void) {


vec2 uv = gl_FragCoord.xy / tres.xy * 0.5;
vec4 result = droste(uv);

//vec4 v = texture2D(tex,tcoord);
gl_FragColor = result;

} //endof main




