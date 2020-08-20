#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

float plot(vec2 st, float pct) {
  return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

vec3 hsb2rgb(in vec3 c) {

  vec3 rgb = clamp(
    abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
    0.0,
    1.0
  );

  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);

}

void main() {

  vec2 st       = gl_FragCoord.xy / u_resolution;
  vec2 toCenter = vec2(0.5) - st;
  float angle   = pow(atan(toCenter.y, toCenter.x), 4.0);
  float radius  = length(toCenter) * 2.0;
  vec3 color    = hsb2rgb(vec3(angle / TWO_PI + abs(sin(u_resolution.x)), radius, 1.0));
  gl_FragColor  = vec4(color, 1.0);

}
