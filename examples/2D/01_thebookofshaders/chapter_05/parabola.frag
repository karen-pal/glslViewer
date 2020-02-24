#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float parabola( float x){
    return 4.0*x*(1.0-x);
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = parabola(st.x);

    vec3 color = vec3(y);//(y,y,y)

    float pct = plot(st,y);
    color = (1.0-pct)*color*sin(u_time)+pct*vec3(0.0,1.0,0.0)*(u_time);

    gl_FragColor = vec4(sin(color),1.0);
}
