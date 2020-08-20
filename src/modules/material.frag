#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 posXY, in float radius) {

  vec2 dist = posXY - vec2(.5);
  return 1. - smoothstep(
    radius - radius * .01,
    radius + radius * .01,
    dot(dist, dist) * 4.
  );

}

vec3 makeShape(in vec2 pos, in int sides) {

  float radius = TWO_PI / float(sides);
  pos.x        *= u_resolution.x / u_resolution.y;
  float sdf    = .0;
  pos          = pos * 2. - 1.; // remap the space to -1, 1
  float angle  = atan(pos.x, pos.y) + PI;
  sdf          = cos(floor(.5 + angle / radius) * radius - angle) * length(pos);

  return vec3(1. - smoothstep(.4, .41, sdf));

}

void main() {

  vec2 pos     = gl_FragCoord.xy / u_resolution.xy;
  gl_FragColor = vec4(makeShape(pos, 5), 1.);

}
