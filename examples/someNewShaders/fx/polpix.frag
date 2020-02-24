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
//f0:radius:
//f1:ray count:
//f2:ringy count:

float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

// Control inputs
float Angle    = 0.5; // range 2pi / 100000.0 to 1.0 (rounded down), exponential
float AngleMin = -3.2;// range -3.2 to 3.2
float AngleWidth = 6.4; // range 0.0 to 6.4
float Radius = 1.0 * f2; // range -10000.0 to 1.0
float RadiusMin = 0.2; // range 0.0 to 2.0
float RadiusWidth =  2.; // range 0.0 to 2.0
vec2 Center = vec2(1.0); // range: -1.0 to 3.0

//---------------------------------------------------------------------------------------------------
// URL:  https://machinesdontcare.wordpress.com/2007/12/29/polarpixellate-glsl

void main() {
vec2 texCoord = tcoord;
vec2 normCoord;
normCoord.x = 2.0 * tcoord.x - Center.x;
normCoord.y = 2.0 * tcoord.y - Center.y;

// Convert Cartesian to Polar coords
float r = length(normCoord) *f0;
float theta = atan(normCoord.y, normCoord.x) * f1 * 4.;

// The actual effect
r = (r < RadiusMin) ? r : (r > RadiusMin + RadiusWidth) ? r : ceil(r / Radius) * Radius;
theta = (theta < AngleMin) ? theta : (theta > AngleMin + AngleWidth) ? theta : floor(theta / Angle) * Angle;

// Convert Polar back to Cartesian coords
normCoord.x = r * cos(theta);
normCoord.y = r * sin(theta);

// Shift origin back to bottom-left (taking offset into account)
texCoord.x = normCoord.x / 2.0 + (Center.x / 2.0);
texCoord.y = normCoord.y / 2.0 + (Center.y / 2.0);

// Output
gl_FragColor = texture2D(tex, texCoord);
}



