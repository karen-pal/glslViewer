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
//f0:count:
//f1:width:
//f2:scaled range:
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.5, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);


float time = float(itime) + ftime;

float scale = 100.0 *f0;
float EPSILON = 0.2;// 0.001
float reflection = 2.5;// 1.5
float heightScale = 10000.0 * f1;// 10000.0
float rangeScale = 8. *f2;// 2.0
float speed = 6.0;

float getHeight(vec2 uv) {
    return cos(0.5*sqrt(uv.x*uv.x+uv.y*uv.y)-speed*time)/
             (1.0/rangeScale*(uv.x*uv.x+uv.y*uv.y)+3.0*time)*heightScale;
}

vec3 getNormal(vec3 p, float eps) {
    vec3 n;
    n.z = p.z;
    n.x = n.z-getHeight(vec2(p.x+eps, p.y));
    n.y = n.z-getHeight(vec2(p.x, p.y+eps));
    n.z = eps;
    return normalize(n);
}

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/MdtGzM

void main(void) {

vec2 uv = gl_FragCoord.xy / tres.xy;
vec4 camColor = texture2D(tex, uv);

// z-position
uv = uv*2.0-1.0;
uv *= scale;
float n = floor(time-floor(time/10.0)*10.0);
float z = getHeight(uv);

// normal
vec3 p = vec3(uv, z);
vec3 normal = getNormal(p, EPSILON);
vec3 refractDir = refract(vec3(0, 0, -1), normal, 1.0/reflection);

// actual pixel
float k = -p.z/refractDir.z;
vec3 actualPt = p+k*refractDir;
vec2 samp = (actualPt.xy/scale+1.0)/2.0;
vec4 actualColor = texture2D(tex, samp);

gl_FragColor = actualColor;


//vec4 v = texture2D(tex,tcoord);
//gl_FragColor = v;

} //endof main




