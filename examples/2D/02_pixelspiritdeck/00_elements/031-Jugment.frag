#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#include "../lib/fill.glsl"
#include "../lib/stroke.glsl"
#include "../lib/raysSDF.glsl"
#include "../lib/flip.glsl"

void main(){
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy*5.;
    st = (st-.5)*1.1912+.5;
    if (u_resolution.y > u_resolution.x ) {
        st.y *= u_resolution.y/u_resolution.x;
        st.y -= (u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x;
    } else {
        st.x *= u_resolution.x/u_resolution.y;
        st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
    }
    //START
    color += flip(stroke(raysSDF(st,int(tan(u_time))+28),.5,.2),
                  fill(tan(u_time)*sin(u_time)+st.y,.5));
    
    
    vec2 st_2 = gl_FragCoord.xy/u_resolution.xy*atan(u_time);
    color -= raysSDF(st_2,int(tan(u_time)*fract(u_time))+28);
    //END
    gl_FragColor = vec4(color,1.);
}
