/// <reference path="js/babylon.2.1.d.ts" />


var BjsApp = BjsApp || {};

BjsApp.init = function() {
    //get the canvas
    var canvas = document.getElementById('renderCanvas');

    //create a Babylon engine object
    var engine = new BABYLON.Engine(canvas, true);

    //create scene
    var scene = new BABYLON.Scene(engine);

    //create camera
    var camera = new BABYLON.TouchCamera('camera', new BABYLON.Vector3(1, 3, 1) ,scene);

    //let the user move the camera
    camera.attachControl(canvas);

    //camera.upperRadiusLimit = 50;

    //light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;
    light.groundColor = new BABYLON.Color3(0, 0, 1);

    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    //sun
    var sun = BABYLON.Mesh.CreateSphere('sun', 16, 4, scene);
    var sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
    sunMaterial.emissiveTexture = new BABYLON.Texture('image/sun.jpg', scene);
    sunMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    sunMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    sun.material = sunMaterial;

    //sun light
    var sunlight = new BABYLON.PointLight('sunlight', BABYLON.Vector3.Zero(), scene);
    sunlight.intensity = 2;

    //planets
    var planet1Material = new BABYLON.StandardMaterial('planetMat', scene);
    planet1Material.diffuseTexture = new BABYLON.Texture('image/sand.jpg', scene);
    planet1Material.specularColor = new BABYLON.Color3(0, 0, 0);

    var planet1 = BABYLON.Mesh.CreateSphere('planet1', 16, 1, scene);
    planet1.position.x = 4;
    planet1.material = planet1Material;
    planet1.orbit = {
        radius: planet1.position.x,
        speed: 0.01,
        angle: 0
    };

    var planet2 = BABYLON.Mesh.CreateSphere('planet2', 16, 1, scene);
    planet2.position.x = 6;
    planet2.material = planet1Material;
    planet2.orbit = {
        radius: planet2.position.x,
        speed: -0.01,
        angle: 0
    };

    var planet3 = BABYLON.Mesh.CreateSphere('planet3', 16, 1, scene);
    planet3.position.x = 8;
    planet3.material = planet1Material;
    planet3.orbit = {
        radius: planet1.position.x,
        speed: 0.02,
        angle: 0
    };

    //skybox
    var skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial('skyboxMat', scene);

    //dont render what we cannot see
    skyboxMaterial.backFaceCulling = false;

    //move with camera
    skybox.infiniteDistance = true;

    skybox.material = skyboxMaterial;

    //remove reflection in skybox
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    //texture of 6 sides of the cube
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('../image/skybox', scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    //thing method allows you to animate / move things
    scene.beforeRender = function() {
        planet1.position.x = planet1.orbit.radius * Math.sin(planet1.orbit.angle);
        planet1.position.z = planet1.orbit.radius * Math.cos(planet1.orbit.angle);
        planet1.orbit.angle += planet1.orbit.speed;

        planet2.position.x = planet2.orbit.radius * Math.sin(planet2.orbit.angle);
        planet2.position.z = planet2.orbit.radius * Math.cos(planet2.orbit.angle);
        planet2.orbit.angle += planet2.orbit.speed;

        planet3.position.x = planet3.orbit.radius * Math.sin(planet3.orbit.angle);
        planet3.position.z = planet3.orbit.radius * Math.cos(planet3.orbit.angle);
        planet3.orbit.angle += planet3.orbit.speed;

    };

    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
};