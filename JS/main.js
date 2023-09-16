var renderer, scene, camera, composer, circle, circleWithFrim, skelet, particle,dotnetMesh;
var controls;
window.onload = function () {
    init();
    animate();
}

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 300;
    scene.add(camera);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    circle = new THREE.Object3D();
    skelet = new THREE.Object3D();
    particle = new THREE.Object3D();
    circleWithFrim = new THREE.Object3D();
    dotnetMesh = new THREE.Object3D();

    scene.add(circle);
    scene.add(skelet);
    scene.add(particle);
    scene.add(circleWithFrim);
    scene.add(dotnetMesh);

    var geometry = new THREE.TetrahedronGeometry(2, 0);
    var geom = new THREE.IcosahedronGeometry(4, 1);
    var geom2 = new THREE.IcosahedronGeometry(5, 1);
    var dotnut = new THREE.TorusGeometry(12, 0.4, 24, 96);

    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    for (var i = 0; i < 2000; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(90 + (Math.random() * 700));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        particle.add(mesh);
    }

    var mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        shading: THREE.FlatShading
    });

    var mat2 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    });
    var mat4 = new THREE.MeshPhongMaterial({
        color: 0xdddddd,
        wireframe: true,
        side: THREE.DoubleSide
    });
    var mat5 = new THREE.LineBasicMaterial({
        color: 0x222222,
        wireframe: true,
        side: THREE.DoubleSide
    });


    var planet = new THREE.Mesh(geom, mat);
    planet.scale.x = planet.scale.y = planet.scale.z = 16;
    circle.add(planet);

    var planet2 = new THREE.Mesh(geom2, mat2);
    planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
    skelet.add(planet2);

    var plantWithfrim = new THREE.Mesh(geom2, mat4);
    plantWithfrim.scale.x = plantWithfrim.scale.y = plantWithfrim.scale.z = 12;
    circleWithFrim.add(plantWithfrim);

    var dotmesh = new THREE.Mesh(dotnut, mat5);
    dotmesh.scale.x = dotmesh.scale.y = dotmesh.scale.z = 20;
    dotnetMesh.add(dotmesh);

    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    var lights = [];
    lights[0] = new THREE.DirectionalLight(0xffffff, 1);
    lights[0].position.set(1, 0, 0);
    lights[1] = new THREE.DirectionalLight(0x11E8BB, 1);
    lights[1].position.set(0.75, 1, 0.5);
    lights[2] = new THREE.DirectionalLight(0x8200C9, 1);
    lights[2].position.set(-0.75, -1, 0.5);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);


    window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    particle.rotation.x += 0.0000;
    particle.rotation.y -= 0.0040;
    circle.rotation.x -= 0.0020;
    circle.rotation.z -= 0.0030;
    skelet.rotation.x -= 0.0010;
    skelet.rotation.y += 0.0020;
    circleWithFrim.rotation.x += 0.0020;
    circleWithFrim.rotation.y += 0.0030;
    dotnetMesh.rotation.y += 0.02;

    renderer.clear();

    for(var i = 0; i< particle.children.length; i++){
        particle.children[i].rotation.x += 0.001;
        particle.children[i].rotation.y += 0.001;
        particle.children[i].rotation.z += 0.001;
    }

    renderer.render(scene, camera)
};

