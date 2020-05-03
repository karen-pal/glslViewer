#include "../lib/stroke.glsl"
vec3 bridge(vec3 c,float d,float s,float w) {
    c *= 1.-stroke(d,s,w*2.);
    return c + stroke(d,s,w);
}
