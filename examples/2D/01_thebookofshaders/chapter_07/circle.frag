// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(in vec2 _st, in float _radius, float size){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*2.),
                         _radius+(_radius*2.),
                         dot(dist,dist)*size*30.);

} 

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec3 color = vec3(circle(st,0.9, abs(sin(u_time))));

	gl_FragColor = vec4( color, 1.0 );
}
