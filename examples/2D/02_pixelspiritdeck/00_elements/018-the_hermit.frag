// Number: IX
// Title: The Hermit
// Author: Patricio Gonzalez Vivo

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#include "../lib/fill.glsl"
#include "../lib/flip.glsl"
#include "../lib/stroke.glsl"
#include "../lib/triSDF.glsl"
#include "../lib/rhombSDF.glsl"

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = (st-.5)*1.1912+.5;
    if (u_resolution.y > u_resolution.x ) {
        st.y *= u_resolution.y/u_resolution.x;
        st.y -= (u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x;
    } else {
        st.x *= u_resolution.x/u_resolution.y;
        st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
    }
    //START
    color += flip(fill(triSDF(st),.5*abs(sin(u_time*.3))),
                  fill(rhombSDF(st),.4));
    color += flip(fill(rhombSDF(st),.8*abs(sin(u_time*.3))),
                  fill(triSDF(st),.9));
    color += flip(fill(triSDF(st),1.2*abs(sin(u_time*.3))),
                  fill(rhombSDF(st),1.5));
    color += flip(fill(rhombSDF(st),1.7*abs(sin(u_time*.3))),
                  fill(triSDF(st),2.));

    float sdf1 = 1.- rhombSDF(st);
    float sdf2 = 1.- triSDF(st);
    //color += fill(sdf1,.425)*sin(u_time);
    color += stroke(sdf1,.5,.05*abs(sin(u_time*.5)))*2.;
    color += stroke(sdf2,.6,.04*abs(sin(u_time*.5)))*2.;
    color += stroke(sdf1,.7,.03*abs(sin(u_time*.5)))*2.;
    color += stroke(sdf2,.8,.02*abs(sin(u_time*.5)))*2.;
    color += stroke(sdf1,.9,.01*abs(sin(u_time*.5)))*2.;
    //END
    color *= fract(sdf1*sdf2);

    gl_FragColor = vec4(color,1.);
}
