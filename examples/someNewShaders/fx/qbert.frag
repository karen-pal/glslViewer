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

//f0:cube size:
//f1::
//f2::
float f0 = mix(0.05, 0.95, fparams[0]);
float f1 = mix(0.05, 0.95, fparams[1]);
float f2 = mix(0.05, 0.95, fparams[2]);

float time = float(itime) + ftime;

float cellFactor = floor(clamp(tres.x/30., 20., 100.)/6.)*6.;
vec2 cellSize = vec2(cellFactor, cellFactor*1.5) / f0;
const float light = 1.15;
const float dark = 0.85;
//float zoom = max(iResolution.x/tres.x, iResolution.y/tres.y);
float zoom = max(tres.x/tres.x, tres.y/tres.y);

bool tri(const vec2 p1, const vec2 p2, const vec2 p3, const vec2 p) {
    float alpha = ((p2.y - p3.y)*(p.x - p3.x) + (p3.x - p2.x)*(p.y - p3.y)) /
        ((p2.y - p3.y)*(p1.x - p3.x) + (p3.x - p2.x)*(p1.y - p3.y));

    float beta = ((p3.y - p1.y)*(p.x - p3.x) + (p1.x - p3.x)*(p.y - p3.y)) /
       ((p2.y - p3.y)*(p1.x - p3.x) + (p3.x - p2.x)*(p1.y - p3.y));

    float gamma = 1.0 - alpha - beta;
    
    return (alpha >= 0.0 && beta >= 0.0 && gamma >= 0.0);      
}

//---------------------------------------------------------------------------------------------------
// https://www.shadertoy.com/view/XscSWH

void main(void) {


  vec2 cell = vec2(mod(gl_FragCoord.x, cellSize.x), mod(gl_FragCoord.y, cellSize.y));
    vec2 norm = cell.xy / cellSize;
    vec2 res = vec2(0.0, 0.0);
    float bright = 1.0;
    
    //1
    if (tri(vec2(0.0,0.0), vec2(1.0,0.0), vec2(0.5,0.125), norm)) {res = vec2(0.5, -0.125); bright = light;}
    //2
    else if (tri(vec2(0.0,0.0), vec2(0.5,0.125), vec2(0.0,.375), norm)) {res = vec2(0.0, 0.375); bright = dark;}
    else if (tri(vec2(0.5,0.125), vec2(0.5,0.5), vec2(0.0,.375), norm)) {res = vec2(0.0, 0.375); bright = dark;}
    //3
    else if (tri(vec2(1.0,0.0), vec2(1.0,.375), vec2(0.5,0.125), norm)) {res = vec2(1.0, 0.375);}
    else if (tri(vec2(0.5,0.125), vec2(0.5,0.5), vec2(1.0,.375), norm)) {res = vec2(1.0, 0.375);}
    //4
    else if (tri(vec2(0.0,.375), vec2(0.0,.625), vec2(0.5,0.5), norm)) {res = vec2(0.0, 0.375); bright = light;}
    //5
    else if (tri(vec2(1.0,.375), vec2(1.0,.625), vec2(0.5,0.5), norm)) {res = vec2(1.0, 0.375); bright = light;}
    //6
    else if (tri(vec2(0.5,0.5), vec2(0.0,.625), vec2(0.0,1.0), norm)) {res = vec2(0.5, 0.875);}
    else if (tri(vec2(0.0,1.0), vec2(0.5,0.875), vec2(0.5,0.5), norm)) {res = vec2(0.5, 0.875);}
    //7
    else if (tri(vec2(0.5,0.5), vec2(1.0,.625), vec2(1.0,1.0), norm)) {res = vec2(0.5, 0.875); bright = dark;}
    else if (tri(vec2(1.0,1.0), vec2(0.5,0.875), vec2(0.5,0.5), norm)) {res = vec2(0.5, 0.875); bright = dark;}
    //8
    else if (tri(vec2(0.0,1.0), vec2(1.0,1.0), vec2(0.5,0.875), norm)) {res = vec2(0.5, 0.875); bright = light;}
        
    gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    for(float i = -1.5; i<1.5; i+=1.0) {
        for (float j = -1.5; j<1.5; j+=1.0) {
            gl_FragColor += clamp(texture2D(
                tex, 
                vec2(
                    ((floor(gl_FragCoord.x/cellSize.x)+res.x)*cellSize.x+i)/tres.x,
                    ((floor(gl_FragCoord.y/cellSize.y)+res.y)*cellSize.y+j)/tres.y
                ) / zoom
            )*bright, 0.0, 1.0);
        }
    }
    gl_FragColor = clamp(gl_FragColor / 9.0, 0.0, 1.0);
    


} //endof main



