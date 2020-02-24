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
//f0:thickness:
//f1:blur:
//f2:frequency:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, 0.);
float f2 = mix(0.2, 0.95, fparams[2]);

// http://glslsandbox.com/e#39383.0
float time =  u_time;


//---------------------------------------------------------------------------------------------------
void main(void) {

vec4 color = vec4(1.0,1.0,1.0,1.0);
vec2 coords = 2.0 * ( gl_FragCoord.xy/u_resolution.xy ) - 1.0;
coords.x = coords.x * ( u_resolution.y / u_resolution.x );


vec2 sap =  vec2(coords.x, sin(5.0*coords.x /f2 - time));
vec2 sap2 = vec2(coords.x, sin(5.0*coords.x - 2.0 *time));
vec2 sap3 = vec2(coords.x, sin(5.0*coords.x - 3.0 * time));

float dist = abs(coords.y - abs(sap.y));
float dist2 = abs(coords.y - sap2.y) *f1;
float dist3 = abs(coords.y - abs(sap3.y));

float col = dist *  dist2* dist3 * 7.0 /f0;

color = vec4(col *dist,col*dist2,col * abs(sin(time) * 2.0),1.0);


    gl_FragColor = color;
    
   
} //endof main


