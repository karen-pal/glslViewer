// shader type: gen 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
precision mediump float;
varying vec2 tcoord;// location
uniform sampler2D tex;// texture one
uniform sampler2D tex2;// texture two
uniform vec2 tres;// size of texture (screen)
uniform vec4 fparams;// 4 floats coming in
uniform ivec4 iparams;// 4 ints coming in
uniform float ftime;// 0.0 to 1.0
uniform int itime;// increases when ftime hits 1.0
//f0:highlight 1:
//f1:highlight 2:
//f2:diag zoom:
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);


float time = float(itime) + ftime;
vec2 resolution = tres;

vec2 Distort(vec2 p) {
    float theta  = atan(p.y, p.x);
    float radius = length(p)*f0 + 0.25;
    radius = pow(radius, 1.3);
    p.x = radius * cos(theta);
    p.y = radius * sin(theta);
    return f1 * (p + 1.0);
}

vec4 pattern(vec2 p) {
vec2 m=mod(p.xy+p.x+p.y,2.)-1.;
return vec4(length(m));
}

float hash(const float n) {
return fract(sin(n)*43758.5453);
}

float noise(const vec3 x) {
vec3 p=floor(x);
vec3 f=fract(x);

    f=f*f*(3.0-2.0*f);

    float n=p.x+p.y*57.0+p.z*43.0;

    float r1=mix(mix(hash(n+0.0),hash(n+1.0),f.x),mix(hash(n+57.0),hash(n+57.0+1.0),f.x),f.y);
    float r2=mix(mix(hash(n+43.0),hash(n+43.0+1.0),f.x),mix(hash(n+43.0+57.0),hash(n+43.0+57.0+1.0),f.x),f.y);

return mix(r1,r2,f.z);
}

void main( void ) {

vec2 position = ( gl_FragCoord.xy / resolution.xy * 12. * f2 + 3.)  ;

float off = noise(position.xyx + time);
vec4 c = pattern(Distort(position+off));

c.xy = Distort(c.xy);
gl_FragColor = vec4(c.x - off, sin(c.y) - off, cos(c.z), 1.0);

}


