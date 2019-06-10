class MaterialPreview {

  constructor(rootSel='#js-threeViewer', shaders) {

    this.canvas   = document.querySelector(rootSel);
    if (!this.canvas) return;
    this.camera   = new THREE.Camera();
    this.scene    = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.geo      = new THREE.PlaneBufferGeometry(2, 2);

    // uniform vec3      iResolution;           // viewport resolution (in pixels)
    // uniform float     iTime;                 // shader playback time (in seconds)
    // uniform float     iTimeDelta;            // render time (in seconds)
    // uniform int       iFrame;                // shader playback frame
    // uniform float     iChannelTime[4];       // channel playback time (in seconds)
    // uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
    // uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
    // uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
    // uniform vec4      iDate;                 // (year, month, day, time in seconds)
    // uniform float     iSampleRate;           // sound sample rate (i.e., 44100)

    this.uniforms = {
      colorStopOne: {
        type: "c",
        value : [1, 0, 1]
      },
      colorStopTwo: {
        type: "c",
        value: [0, 0, 0]
      },
      u_resolution: {
        type: 'vec2',
        value: new THREE.Vector2()
      },
      u_mouse: {
        type: 'vec2',
        value: new THREE.Vector2()
      },
      u_time: {
        type: 'float',
        value: 1.0
      }
    };
    [
      this.vertexShader,
      this.fragmentShader
    ] = shaders;
    this.material = this.newMaterial();
    this.init();

  }

  init() {

    this.camera.position.z = 1;
    this.scene.add(new THREE.Mesh(this.geo, this.material));
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.canvas.appendChild(this.renderer.domElement);
    this.setRendererDimensions();
    this.bindEvents();
    this.render();

  }

  setRendererDimensions() {

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.camera.aspect = window.innerWidth / window.innerHeight;
    // this.camera.updateProjectionMatrix();
    this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
    this.uniforms.u_resolution.value.y = this.renderer.domElement.height;

  }

  bindEvents() {

    window.addEventListener(
      'resize',
      this.setRendererDimensions.bind(this),
      false
    );

    document.onmousemove = ev => {
      this.uniforms.u_mouse.value.x = ev.pageX;
      this.uniforms.u_mouse.value.y = ev.pageY;
    }

  }

  newMaterial() {

    return new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    });

  }

  render() {

    this.uniforms.u_time.value += 0.05;
    this.renderer.render(this.scene, this.camera);
    // TODO: audit the performance of binding 'this' here...
    window.requestAnimationFrame(this.render.bind(this));

  }

}

const shaders = [
  document.getElementById('vertexShader').textContent,
  document.getElementById('quarternionJuliaFractal').textContent
]

new MaterialPreview('#js-threeViewer', shaders);
