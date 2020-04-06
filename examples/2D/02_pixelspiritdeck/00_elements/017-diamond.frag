// Title: The Diamond
// Author: Patricio Gonzalez Vivo

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#include "../lib/fill.glsl"
#include "../lib/stroke.glsl"
#include "../lib/triSDF.glsl"
//GLOBAL_START
float rhombSDF1(vec2 st) {
    return max(triSDF(st),
               triSDF(vec2(st.x,1.-st.y)));
}
float rhombSDF2(vec2 st) {
    return mix(triSDF(st),
               triSDF(vec2(st.x,1.-st.y)),.5);
}
float rhombSDF3(vec2 st) {
    return min(triSDF(vec2(st)), //st.x/st.y,st.x)),
               triSDF(vec2(st.x,1.-st.y)))*.5;
}
//GLOBAL_END

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
    float sdf1 = rhombSDF1(st);
    float sdf2 = rhombSDF2(st);
    float sdf3 = rhombSDF3(st);

    color += fill(sdf1,.425)*sin(u_time);
    color += stroke(sdf1,.5,.05*sin(u_time*.5));
    color += stroke(sdf1,.6,.04*sin(u_time*.4));
    color += stroke(sdf1,.7,.03*sin(u_time*.3));
    color += stroke(sdf1,.8,.02*sin(u_time*.2));
    color += stroke(sdf1,.9,.01*sin(u_time*.1));

    color += fill(sdf2,.425)*sin(u_time);
    color += stroke(sdf2,.5,.05*sin(u_time*.5));
    color += stroke(sdf2,.6,.04*sin(u_time*.4));
    color += stroke(sdf2,.7,.03*sin(u_time*.3));
    color += stroke(sdf2,.7,.02*sin(u_time*.2));
    color += stroke(sdf2,.7,.01*sin(u_time*.1));

    //color += fill(sdf3,.225)*sin(u_time);
    color += stroke(sdf3,.5,.05*sin(u_time*.5));
    color += stroke(sdf3,.6,.04*sin(u_time*.4));
    color += stroke(sdf3,.7,.03*sin(u_time*.3));
    color += stroke(sdf3,.7,.02*sin(u_time*.2));
    color += stroke(sdf3,.7,.01*sin(u_time*.1));
    //END
    gl_FragColor = vec4(color,1.);
}
