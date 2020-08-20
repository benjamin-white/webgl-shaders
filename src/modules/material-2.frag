#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 colorStopOne;
uniform vec3 colorStopTwo;
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 vUv;

void main() {
  vec3 color   = mix(colorStopOne, vec3(abs(sin(u_time)), abs(sin(u_time)), abs(sin(u_time))), vUv.x);
  gl_FragColor = vec4(color, 1.0);
}
