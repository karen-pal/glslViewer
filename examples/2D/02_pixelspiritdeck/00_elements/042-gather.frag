// Title: The Cauldron
// Author: Patricio Gonzalez Vivo

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#include "../lib/math.glsl"
#include "../lib/stroke.glsl"
#include "../lib/rotate.glsl"
#include "../lib/vesicaSDF.glsl"
#include "../lib/flip.glsl"
#include "../lib/raysSDF.glsl"
#include "../lib/fill.glsl"

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = (st-.5)*1.1912+.5;
    st = mix(vec2((st.x*u_resolution.x/u_resolution.y)-(u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y,st.y), 
             vec2(st.x,st.y*(u_resolution.y/u_resolution.x)-(u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x), 
             step(u_resolution.x,u_resolution.y));
    //START
    float n =sin(u_time)* 12.+1.;
    float a = TAU/n;
    for (float i = 0.; i < n; i++) {
        vec2 xy = rotate(st,a*i);
        xy.y -= .189;
        float vsc = vesicaSDF(xy,.3)*sin(u_time);
        color *= 1.-stroke(vsc,.45,0.1)*
                 step(.5,xy.y);
        color += stroke(vsc,.45,0.05);
    }
    vec2 st_2 = gl_FragCoord.xy/u_resolution;
    color -= raysSDF(st_2, 28);
    //END
    gl_FragColor = vec4(color,1.);
}
