// shader type: fx 
// shader written by unknown on glslsandbox.com  
// shader translated to gles by Erogenous-Tones.com 
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 tcoord;       //
uniform sampler2D tex;     // texture one
uniform sampler2D tex2;    // texture two
uniform vec2 u_resolution;         // size of texture (screen)
uniform vec4 fparams;      // 4 floats coming in
uniform ivec4 iparams;     // 4 ints coming in
uniform float u_time;       // 0.0 to 1.0
uniform int itime;         // increases when ftime hits 1.0
//f0::
//f1::
//f2::
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = u_time;

vec3 rgb2hsv(vec3 c){
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	//vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	//vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
	vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
	vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);

	float d = q.x - max(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c){
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

//---------------------------------------------------------------------------------------------------
// https://www.interactiveshaderformat.com/sketches/390 (welcome VDMX iSF )

void main(void) {

	// the interactive variables
	float inverse = 0.0;
	float colorize = 1.;//0-1
	float powerCurve =4.0;//0-4

	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	float centerBrightness = clamp(sin(time), 0.5, 1.0); //0-1

	//vec4inColor = IMG_NORM_PIXEL(inputImage, isf_FragNormCoord);
	vec4 inColor = texture2D(tex,uv);
	vec4 hslColor;
	vec4 outColor;

	//convert to HSV
	hslColor.rgb = rgb2hsv(inColor.rgb);
	outColor.rgb = hslColor.rgb;
	outColor.a = inColor.a;

	//drop the saturation
	//outColor.g = 0.0;

	//adjust the brightness curve
	outColor.b = pow(outColor.b, powerCurve);
	outColor.b = (outColor.b < centerBrightness) ? (1.0 - outColor.b / centerBrightness) : (outColor.b - centerBrightness) / centerBrightness;

	if (inverse > 0.5) {
		outColor.b =  1.0 - outColor.b;
		outColor.g = outColor.g * (1.0-hslColor.b) * colorize;
	} else {
		outColor.g = outColor.g * hslColor.b * colorize;
	 }

	//convert back to rgb
	outColor.rgb = hsv2rgb(outColor.rgb);
	outColor.a = 1.0;

	gl_FragColor = outColor;

} //endof main





