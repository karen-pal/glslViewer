// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#define PI 3.14159265359
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_x0;
uniform float u_x1;
uniform float u_x2;
uniform float u_x3;


mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

		//begin code_to_rotate
    st -= vec2(0.5);

    // rotate the space
    st = rotate2d( sin(u_time)*PI ) * st;
    // move it back to the original place
    st += vec2(0.5);
    
		//end

		vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float 
    //f = cos(a*3.);
    // f = abs(cos(a*3.));
    f2 = abs(cos(a*2.5))*.5+.3;
    float f = fract(cos(a*u_x0)*sin(a*u_x1))*abs(sin(u_time))+u_x2*sin(u_time);
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    color = vec3( 1.-smoothstep(f,f2+u_x3,r) );




    gl_FragColor = vec4(color, 1.0);
}
