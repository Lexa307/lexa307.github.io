/*global THREE*/
/*global dat*/
function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}

function DispersionMaterial(parameters) {
  THREE.ShaderMaterial.call(this);

  this.envMap = null;
  this.refractionRatio = 0.98;
  this.lights = true;
  this.isMeshBasicMaterial = true; // Force refreshUniformsCommon to be run
  this.dispersionSamples = 10;
  this.dispersion = 0.05;
  this.dispersionBlendMultiplier = 20;
  this.uWiggleScale =  0.5 ;
  this.uWiggleDisplacement =  18.;
  this.uWiggleSpeed = 0.33 ;
  this.progress = 1.;
  this.time = 0.;
  this.reflectivity = 0;
  this.roughness = 1;
  this.metalness=1;
  this.DISPERSION_SAMPLES=30;
  this.pointLights = [];
  
  var envmap_dispersion_pars_fragment = document.getElementById('envmap_dispersion_pars_fragment').textContent;
  var envmap_dispersion_fragment = document.getElementById('envmap_dispersion_fragment').textContent;
  var fragmentShader = THREE.ShaderLib.physical.fragmentShader;
  var vertex_Shader = `#define PHYSICAL
  varying vec3 vViewPosition;
  #ifndef FLAT_SHADED
    varying vec3 vNormal;
  #endif
  #include <common>
  #include <uv_pars_vertex>
  #include <uv2_pars_vertex>
  #include <displacementmap_pars_vertex>
  #include <envmap_pars_vertex>
  #include <color_pars_vertex>
  #include <fog_pars_vertex>
  #include <morphtarget_pars_vertex>
  #include <skinning_pars_vertex>
  #include <shadowmap_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>
     	     
  uniform float time;
  varying vec2 vUv;
  varying vec2 vUv1;
  varying vec4 vPosition;
  varying float tProgress;
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform vec2 pixels;
  uniform vec2 uvRate1;
  uniform float progress;
  attribute float offset;
  attribute vec3 displacement;
  //uniform float refractionRatio;
  varying vec3 worldPositions;
  varying vec3 cameraToVertexs;
  varying vec3 worldNormals;
  
     uniform float amplitude;
precision highp float;
precision highp int;
varying vec3 vRefract;
//varying vec2 vUv;
uniform float uWiggleScale;
uniform float uWiggleDisplacement;
uniform float uWiggleSpeed;
uniform float uRefractionRatio;
vec3 mod289(vec3 x) {
return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x) {
return mod289(((x*34.0)+1.0)*x);
}
vec4 taylorInvSqrt(vec4 r) {
return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
return t*t*t*(t*(t*6.0-15.0)+10.0);
}
// Classic Perlin noise
float cnoise(vec3 P) {
vec3 Pi0 = floor(P); // Integer part for indexing
vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
Pi0 = mod289(Pi0);
Pi1 = mod289(Pi1);
vec3 Pf0 = fract(P); // Fractional part for interpolation
vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
vec4 iy = vec4(Pi0.yy, Pi1.yy);
vec4 iz0 = Pi0.zzzz;
vec4 iz1 = Pi1.zzzz;
vec4 ixy = permute(permute(ix) + iy);
vec4 ixy0 = permute(ixy + iz0);
vec4 ixy1 = permute(ixy + iz1);
vec4 gx0 = ixy0 * (1.0 / 7.0);
vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
gx0 = fract(gx0);
vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
vec4 sz0 = step(gz0, vec4(0.0));
gx0 -= sz0 * (step(0.0, gx0) - 0.5);
gy0 -= sz0 * (step(0.0, gy0) - 0.5);
vec4 gx1 = ixy1 * (1.0 / 7.0);
vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
gx1 = fract(gx1);
vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
vec4 sz1 = step(gz1, vec4(0.0));
gx1 -= sz1 * (step(0.0, gx1) - 0.5);
gy1 -= sz1 * (step(0.0, gy1) - 0.5);
vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
g000 *= norm0.x;
g010 *= norm0.y;
g100 *= norm0.z;
g110 *= norm0.w;
vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
g001 *= norm1.x;
g011 *= norm1.y;
g101 *= norm1.z;
g111 *= norm1.w;
float n000 = dot(g000, Pf0);
float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
float n111 = dot(g111, Pf1);
vec3 fade_xyz = fade(Pf0);
vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
return 2.2 * n_xyz;
}
  
  mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
     float oc = 1.0 - c;
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0);
    }
vec3 rotatet(vec3 v, vec3 axis, float angle) {
mat4 m = rotationMatrix(axis, angle);
    return vec3((m * vec4(v, 1.0)).x,(m * vec4(v, 1.0)).y,(m * vec4(v, 1.0)).z);
}
  vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {    
      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
  }
  void main() {
    #include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  vViewPosition = - mvPosition.xyz;
  #include <worldpos_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>  
    
    
    float noise = cnoise(normalize(position) * uWiggleScale + ( time * uWiggleSpeed ) );//normalize(position)
          vec3 pos = position - vec3(800.0,0.0,0.0) + normal * noise * vec3(uWiggleDisplacement);
           worldPositions = (modelMatrix * vec4(pos, 1.0)).xyz;
           cameraToVertexs = normalize(worldPositions - cameraPosition);
           worldNormals = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);
          //vRefract = refract(cameraToVertex, worldNormal, refractionRatio);
          vUv = uv;
         
        
          vec3 newPosition =  normal * amplitude* displacement;
          //vFresnelNormal = normalize(normalMatrix * normal);
          //vec4 modelPos = modelViewMatrix * vec4(pos+newPosition, 1.0);
          //vFresnelPosition = modelPos.xyz;
          
                 vec3 newpos = position + vec3(-800.,0.,0.);
                 tProgress = clamp(-1.,1., (progress - offset*0.001)/0.2 );
                 newpos = mix(position, newpos, tProgress);
                 newpos = bezier4(position, vec3(-400.,0.,1.) , vec3(-800.,0.,1.) ,newpos, tProgress);  
                 
                 
                 gl_Position = projectionMatrix * modelViewMatrix * vec4( position+newpos*noise, 1.0 );//*nois
                 
  
  }
  
`
  fragmentShader = fragmentShader.replace('#include <envmap_pars_fragment>', '#include <envmap_pars_fragment>\n' + envmap_dispersion_pars_fragment);
  fragmentShader = fragmentShader.replace('gl_FragColor = vec4( outgoingLight, diffuseColor.a );', envmap_dispersion_fragment);
  fragmentShader = fragmentShader.replace('radiance += getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), maxMipLevel );','//');
  this.uniforms = THREE.UniformsUtils.clone( THREE.ShaderLib.physical.uniforms );
  this.vertexShader = vertex_Shader;
  this.fragmentShader = fragmentShader;

  this.setValues( parameters );

  this.uniforms.dispersion = {value: this.dispersion};
  this.uniforms.dispersionBlendMultiplier = {value: this.dispersionBlendMultiplier};
  this.uniforms.uWiggleDisplacement = {value:this.uWiggleDisplacement}
  this.uniforms.uWiggleScale={value:this.uWiggleScale}
  this.uniforms.uWiggleSpeed={value:this.uWiggleSpeed}
  this.uniforms.progress = {  value:this.progress }
  this.uniforms.time = {  value:this.time }
  this.uniforms.reflectivity = {value:this.reflectivity}
  this.uniforms.metalness = {value:this.metalness}
  this.uniforms.roughness = {value:this.roughness};
  //this.uniforms.pointLights = {value:this.pointLights}
  //this.uniforms.DISPERSION_SAMPLES={value:this.DISPERSION_SAMPLES}

  this.defines.DISPERSION_SAMPLES = this.dispersionSamples;
}

DispersionMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
DispersionMaterial.prototype.constructor = DispersionMaterial;

class Slider{
  constructor(selector){
    this.textue = null;
    this.loadTextures();
    



    
    
  }
  onWindowResize () {

    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
  changeImaage(){
    let image = document.createElement('img');
    image.src = window.URL.createObjectURL(this.ImgLoader.files[0]);
    let cbtx = new THREE.CubeTextureLoader().load([image.src,image.src,image.src,image.src,image.src,image.src]);
   
   
    
    this.bigsphere.material.envMap = cbtx;
    
  }
  loadTextures() {
    this.textue = new THREE.CubeTextureLoader()
    .load( [
            'https://sun9-34.userapi.com/c851328/v851328883/1ab13b/qx3NH6sgxQs.jpg',
            'https://sun9-34.userapi.com/c851328/v851328883/1ab13b/qx3NH6sgxQs.jpg',
            'https://sun9-34.userapi.com/c851328/v851328883/1ab13b/qx3NH6sgxQs.jpg',
            'https://sun9-34.userapi.com/c851328/v851328883/1ab13b/qx3NH6sgxQs.jpg',
            'https://sun9-34.userapi.com/c851328/v851328883/1ab13b/qx3NH6sgxQs.jpg',
            'https://sun9-34.userapi.com/c851328/v851328883/1ab13b/qx3NH6sgxQs.jpg'
    ],()=>{
      this.init();
    } )
}  
init(){
  this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 60000 );
    this.scene.background= new THREE.Color(0xA4B9BF);
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    
    this.container;
    this.time = 9.95;
    this.Count = 5;
    this.spheres = [];
   
    
    this.container = document.createElement( 'div' );
    document.body.appendChild( this.container );//  размещение контейнера в body
    this.container.appendChild( this.renderer.domElement );// помещение рендерера в контейнер
    
    
    

    this.raycaster= new THREE.Raycaster();
    //this.raycaster.far=1700;
    this.mouse = new THREE.Vector2();


    window.addEventListener( 'mousemove', bind(this.onMouseMove,this), false );

   this.material = new DispersionMaterial({ 
    extensions: {
      derivatives: '#extension GL_OES_standard_derivatives : enable'
    },
    side: THREE.DoubleSide,
      envMap: this.textue,
      refractionRatio: 1,
      dispersionSamples: 50,
      dispersion: 0.8,
      dispersionBlendMultiplier:2,
      time : 9.95 ,
      progress: 1, 
      uWiggleScale : 0.425 ,
      uWiggleDisplacement :  2.327 ,
      uWiggleSpeed : 0.187 ,
  });
  this.material.envMap.mapping = THREE.CubeReflectionMapping;
  
    this.refractSphereCamera = new THREE.CubeCamera( 0.1, 5000, 512 );
	  this.scene.add( this.refractSphereCamera );
        
	this.fShader = THREE.FresnelShader;
	

	

   
    //this.camera.position.set( -4,  0.1,  -0.3)
    this.camera.lookAt(this.scene.position)
    this.bigtestgeometry=new THREE.IcosahedronGeometry(500, 4);
   // this.bigtestgeometry.scale(  -1, 1, 1 );
    let tessellateModifier = new THREE.TessellateModifier( 60 );
    tessellateModifier.modify( this.bigtestgeometry );
    this.bigtestgeometry = new THREE.BufferGeometry().fromGeometry( this.bigtestgeometry );
    let numFaces = this.bigtestgeometry.attributes.position.count / 3;
    //bigtestgeometry.attributes.position.setDynamic( true );
    let displacement = new Float32Array( numFaces * 9);
    let anim = new Float32Array( numFaces * 9);
    for ( let f = 0; f < numFaces; f ++ ) {
	    let index = 9 * f;
	    let d = 10 * ( 0.5 - Math.random() );
	    for ( let i = 0; i < 3; i ++ ) {
		    displacement[ index + ( 3 * i )     ] = d;
	    	displacement[ index + ( 3 * i ) + 1 ] = d;
		    displacement[ index + ( 3 * i ) + 2 ] = d;

	    }
    }
    
    let offsets = [];
    for (let i = 0; i < (this.bigtestgeometry.attributes.position.count*3); i+=9) {
      let rand = Math.random();
       offsets.push(this.bigtestgeometry.attributes.position.array[i],this.bigtestgeometry.attributes.position.array[i],this.bigtestgeometry.attributes.position.array[i]);
    }
    
    this.bigtestgeometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );
    this.bigtestgeometry.addAttribute( 'position', new THREE.BufferAttribute( this.bigtestgeometry.attributes.position.array, 3 ).setDynamic( true ) );
    this.bigtestgeometry.addAttribute( 'offset', new THREE.BufferAttribute( new Float32Array(offsets), 1 ) );
    this.coregeometry = this.bigtestgeometry;
    this.core=new THREE.Mesh(this.bigtestgeometry,this.customMaterial);
    this.bigsphere=new THREE.Mesh(this.bigtestgeometry,this.material);
    this.scene.add(this.bigsphere);
    
    
     let ambientLight = new THREE.AmbientLight(0x999999); //0x999999
    // ambientLight.visible=true;
     this.scene.add(ambientLight);
     

    this.light = new THREE.PointLight(0xff0000, 0.8,500);
    this.light.position.set(this.camera.position.x,this.camera.position.y,this.camera.position.z);
    this.scene.add(this.light);
       this.camera.position.x = 350;
       this.camera.position.y = 20;
       this.camera.rotation.y = 1.53;
    //TweenMax.to(this.material.uniforms.progress,5,{value:5,repeat:-1,yoyo:true});

  window.addEventListener("resize",bind(this.onWindowResize,this), false);

  this.ImgLoader = document.getElementById( 'imgLoader' );
  this.ImgLoader.addEventListener('change',bind(this.changeImaage,this), false);

this.animate();
}

  

  animate () {
    
	  requestAnimationFrame( this.animate.bind(this) );
 

       
    this.time+=0.001
 

      
       this.bigsphere.material.uniforms.time.value = this.time;

       
      
     

      this.renderer.render( this.scene, this.camera );
     

  }
    onMouseMove ( evvent ) {
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	    this.raycaster.setFromCamera( this.mouse, this.camera );

	// calculate objects intersecting the picking ray
	var intersects = this.raycaster.intersectObjects( this.scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {

		//intersects[ i ].object.material.color.set( 0xff0000 );

	}
	    
    }
  
  
}

let a = new Slider();



//TweenMax.to(material.uniforms.progress,20,{value:5,repeat:-1});