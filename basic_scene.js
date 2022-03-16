<!DOCTYPE html>
<html lang="en">

<head>
	<title>Basic Scene</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<link type="text/css" rel="stylesheet" href="style.css">
  <script src="https://unpkg.com/three@0.133.0/build/three.js" crossorigin="anonymous"></script>
</head>

<body>
	<script type="module">      
		let camera, scene, renderer;
    let mesh;

		init();
		animate();

		function init() {
			const container = document.createElement('div');
			document.body.appendChild(container);

			// All three.js scenes need three things: a scene, a camera, and a renderer
			// For more info read: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

			// #1 create the scene, although there's nothing in it just yet
			scene = new THREE.Scene();

			// #2 create the camera
      // From documentation: https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
      // PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
      // fov — Camera frustum vertical field of view.
      // aspect — Camera frustum aspect ratio.
      // near — Camera frustum near plane.
      // far — Camera frustum far plane.
			camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

			// #3 Pick a three.js renderer
      // Documentation: https://threejs.org/docs/#api/en/renderers/WebGLRenderer
			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);

			// Everything hereafter is optional things we want to add to the scene

			// Add a light to the cene
      // Documentation: https://threejs.org/docs/index.html#api/en/lights/HemisphereLight
      // HemisphereLight( skyColor : Integer, groundColor : Integer, intensity : Float )
      // skyColor - (optional) hexadecimal color of the sky. Default is 0xffffff.
      // groundColor - (optional) hexadecimal color of the ground. Default is 0xffffff.
      // intensity - (optional) numeric value of the light's strength/intensity. Default is 1.
			var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
			light.position.set(0.5, 1, 0.25);
			scene.add(light);

      // Add a polyhedron shape to the scene
      // Documentation: https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry
      // IcosahedronGeometry(radius : Float, detail : Integer)
      // radius — Default is 1.
      // detail — Default is 0. Setting this to a value greater than 0 adds more vertices making it no longer an icosahedron. When detail is greater than 1, it's effectively a sphere.
      const geometry = new THREE.IcosahedronGeometry(0.1, 1);
      const material = new THREE.MeshPhongMaterial({
        color      :  new THREE.Color("rgb(226,35,213)"),
        shininess  :  6,
        shading    :  true,
        transparent: 1,
        opacity    : 0.8
      });
      
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, -0.5);
      scene.add(mesh);

			window.addEventListener('resize', onWindowResize, false);
		}

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		// this function is only called one time
		function animate() {
			// here we set the render function to be called in a loop
			renderer.setAnimationLoop(render);
		}

		// render function called on a loop every time the screen is refreshed
		// which typically means 60 times a second (60 frames per second)
		function render() {
			renderer.render(scene, camera);
    }
	</script>
</body>

</html>
