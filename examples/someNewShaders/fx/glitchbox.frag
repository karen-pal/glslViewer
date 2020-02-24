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
//f0:distort:
//f1:size:
//f2::

   float f0 = mix(0.05, 0.95, fparams[0]);
   float f1 = mix(0.05, 0.95, fparams[1]);
   float f2 = mix(0.05, 0.95, fparams[2]);


//---------------------------------------------------------------------------------------------------
// Binary Glitch - based on Luminosity.  // by D34N 4L3X // dean@neuroid.co.uk

void main() {
   float strength = 1.0 * -f0;

    float x = tcoord.x;
    float y = tcoord.y;
   
    // get snapped position
    float psize = 0.04 * strength;
    float psq = 1.0 / psize;

    float px = floor(x * psq + 0.5) * psize;
    float py = floor(y * psq + 0.5) * psize;
    
 vec4 colSnap = texture2D(tex, vec2(px,py));
    
 float lum = pow(1.0 - (colSnap.r + colSnap.g + colSnap.b) / 3.0, strength); // remove the minus one if you want to invert luma
    
    // do move with lum as multiplying factor
    float qsize = psize * lum /f1;
    
    float qsq = 1.0 / qsize;

    float qx = floor( x * qsq + 0.5) * qsize;
    float qy = floor( y * qsq + 0.5) * qsize;

    float rx = (px - qx) * lum + x;
    float ry = (py - qy) * lum + y;
    
 vec4 colMove = texture2D(tex, vec2(rx,ry));

    // final color
    gl_FragColor = colMove;
}



