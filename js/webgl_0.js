
main();

function main()
{
    var canvas = document.getElementById('gl');
    var gl = canvas.getContext("experimental-webgl");
    var siteRoot = document.getElementById('siteRoot').innerHTML;

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.depthFunc(gl.LEQUAL);

    const timer = new Timer(); 
    const camera = new FPSCam(timer);

    const lightShader = TextureLightShader(gl);
    const skyboxShader = SkyboxShader(gl);
    const depthShader = DepthShader(gl);

    //plane
    var planeModel = new EmptyModel();
    var planeDiffuse = new EmptyTexture();
    var planeNormal = new EmptyTexture();
    var planeMaterial = Material(Vec3(1, 1, 1), Vec3(0, 0, 0), 1, 1);

    var xhrPlaneModel = new XMLHttpRequest();
    xhrPlaneModel.onload = function(e)
    {
        var data = xhrPlaneModel.response;
        planeModel = new Model(gl, data.vertices, data.numVertices, data.indices, data.numIndices);
    }
    xhrPlaneModel.open('GET', siteRoot + 'models/plane.json');
    xhrPlaneModel.responseType = 'json';
    xhrPlaneModel.send();

    var planeDiffuseImg = new Image();
    planeDiffuseImg.onload = function(e)
    {
        planeDiffuse = new Texture(gl, planeDiffuseImg);
    }
    planeDiffuseImg.src = siteRoot + 'textures/large_metal_debris_Base_Color.jpg';

    var planeNormalImg = new Image();
    planeNormalImg.onload = function(e)
    {
        planeNormal = new Texture(gl, planeNormalImg);
    }
    planeNormalImg.src = siteRoot + 'textures/large_metal_debris_Normal.jpg';

    const worldPlane = MatrixScale(10, 10, 10);
    //end plane

    //rock
    var rockModel = new EmptyModel();
    var rockDiffuse = new EmptyTexture();
    var rockNormal = new EmptyTexture();
    var rockMaterial = Material(Vec3(1, 1, 1), Vec3(1, 1, 1), 16, 1);

    var xhrRockModel = new XMLHttpRequest();
    xhrRockModel.onload = function(e)
    {
        var data = xhrRockModel.response;
        rockModel = new Model(gl, data.vertices, data.numVertices, data.indices, data.numIndices);
    }
    xhrRockModel.open('GET', siteRoot + 'models/rock_6.json');
    xhrRockModel.responseType = 'json';
    xhrRockModel.send();

    var rockDiffuseImg = new Image();
    rockDiffuseImg.onload = function(e)
    {
        rockDiffuse = new Texture(gl, rockDiffuseImg);
    }
    rockDiffuseImg.src = siteRoot + 'textures/Rock_6_d_512.png';

    var rockNormalImg = new Image();
    rockNormalImg.onload = function(e)
    {
        var texData = rockNormalImg.response;
        rockNormal = new Texture(gl, rockNormalImg);
    }
    rockNormalImg.src = siteRoot + 'textures/Rock_6_n_512.png';

    var rockLocations = [
        Vec3(-2, 0, 0),
        Vec3(-2, 0, 10),
        Vec3(10, 0, -14),
        Vec3(5, 0, 14),
        Vec3(-20, 0, 20),
        Vec3(-15, 0, 0),
        Vec3(10, 0, 10),
    ]
    //end rock


    //crate
    var crateModel = new EmptyModel();
    var crateDiffuse = new EmptyTexture();
    var crateNormal = new EmptyTexture();
    var crateMaterial = Material(Vec3(1, 1, 1), Vec3(0, 0, 0), 1, 0);

    var xhrCrateModel = new XMLHttpRequest();
    xhrCrateModel.onload = function(e)
    {
        var data = xhrCrateModel.response;
        crateModel = new Model(gl, data.vertices, data.numVertices, data.indices, data.numIndices);
    }
    xhrCrateModel.open('GET', siteRoot + 'models/crate1.json');
    xhrCrateModel.responseType = 'json';
    xhrCrateModel.send();

    var crateDiffuseImg = new Image();
    crateDiffuseImg.onload = function(e)
    {
        crateDiffuse = new Texture(gl, crateDiffuseImg);
    }
    crateDiffuseImg.src = siteRoot + 'textures/WdCrt_c.jpg';

    var crateLocations = [
        Vec3(-12, 0.4, 4),
        Vec3(-21, 0.4, 10),
        Vec3(1, 0.4, -14),
        Vec3(10, 0.4, 5),
    ]
    //end crate

    //house
    var houseModel = new EmptyModel();
    var houseDiffuse = new EmptyTexture();
    var houseNormal = new EmptyTexture();
    var houseMaterial = Material(Vec3(1, 1, 1), Vec3(0, 0, 0), 1, 1);

    var xhrHouseModel = new XMLHttpRequest();
    xhrHouseModel.onload = function(e)
    {
        var data = xhrHouseModel.response;
        houseModel = new Model(gl, data.vertices, data.numVertices, data.indices, data.numIndices);
    }
    xhrHouseModel.open('GET', siteRoot + 'models/WoodenCabinObj.json');
    xhrHouseModel.responseType = 'json';
    xhrHouseModel.send();

    var houseDiffuseImg = new Image();
    houseDiffuseImg.onload = function(e)
    {
        houseDiffuse = new Texture(gl, houseDiffuseImg);
    }
    houseDiffuseImg.src = siteRoot + 'textures/WoodCabinDif_1024.jpg';

    var houseNormalImg = new Image();
    houseNormalImg.onload = function(e)
    {
        houseNormal = new Texture(gl, houseNormalImg);
    }
    houseNormalImg.src = siteRoot + 'textures/WoodCabinNM_1024.jpg';
    var worldHouse = MatrixScale(0.1, 0.1, 0.1).mul(MatrixRotY(-0.75));
    worldHouse = worldHouse.mul(MatrixTranslate(5, 3.35, 0));
    //end house

    //fountain
    var fountainModel = new EmptyModel();
    var fountainDiffuse = new EmptyTexture();
    var fountainNormal = new EmptyTexture(); 
    var fountainMaterial = Material(Vec3(1, 1, 1), Vec3(1, 1, 1), 32, 1);

    var xhrFountainModel = new XMLHttpRequest();
    xhrFountainModel.onload = function(e)
    {
        var data = xhrFountainModel.response;
        fountainModel = new Model(gl, data.vertices, data.numVertices, data.indices, data.numIndices);
    }
    xhrFountainModel.open('GET', siteRoot + 'models/fountain.json');
    xhrFountainModel.responseType = 'json';
    xhrFountainModel.send();

    var fountainDiffuseImg = new Image();
    fountainDiffuseImg.onload = function(e)
    {
        fountainDiffuse = new Texture(gl, fountainDiffuseImg);
    }
    fountainDiffuseImg.src = siteRoot + 'textures/fountainDe.jpg';

    var fountainNormalImg = new Image();
    fountainNormalImg.onload = function(e)
    {
        var texData = fountainNormalImg.response;
        fountainNormal = new Texture(gl, fountainNormalImg);
    }
    fountainNormalImg.src = siteRoot + 'textures/fountainN_NRM.jpg';

    const worldFountain = MatrixScale(0.05, 0.05, 0.05).mul(MatrixTranslate(-7, 0.95, 4));
    //end fountain

    //begin skybox
    var skyboxModel = new EmptyModel();
    var xhrSkyboxModel = new XMLHttpRequest();
    xhrSkyboxModel.onload = function(e)
    {
        var data = xhrSkyboxModel.response;
        skyboxModel = new Model(gl, data.vertices, data.numVertices, data.indices, data.numIndices);
    }
    xhrSkyboxModel.open('GET', siteRoot + 'models/inverted_cube.json');
    xhrSkyboxModel.responseType = 'json';
    xhrSkyboxModel.send();

    var skyboxTexture = new EmptyCubemap();
    var skyboxImages = [];

    var loadSkybox = function(e)
    {
        skyboxTexture = new Cubemap(gl, skyboxImages);
    }

    var skyboxFiles = [
        siteRoot + 'cubemaps/mp_problem/problem-child_ft.png',
        siteRoot + 'cubemaps/mp_problem/problem-child_bk.png',
        siteRoot + 'cubemaps/mp_problem/problem-child_up.png',
        siteRoot + 'cubemaps/mp_problem/problem-child_dn.png',
        siteRoot + 'cubemaps/mp_problem/problem-child_rt.png',
        siteRoot + 'cubemaps/mp_problem/problem-child_lf.png',
    ];

    for(var i = 0; i < 6; i++)
    {
        skyboxImages[i] = new Image();
        skyboxImages[i].onload = loadSkybox;
        skyboxImages[i].src = skyboxFiles[i];
    }

    //end skybox

    const projection = MatrixPerspective(1.24, canvas.width / canvas.height, 0.1, 256.0);
    var view = Matrix();

    var dirLight = DirectionalLight(Vec3(-1.0, 1.0, 1.0).getNorm(), Vec3(1.0, 1.0, 1.0));

    function render(time)
    {
        timer.update(time);
        camera.update();

        colorPass();
        requestAnimationFrame(render);

    } 
    window.requestAnimationFrame(render);


    window.onkeydown = function(e)
    {
        camera.onKeyDown(e);
    }
    window.onkeyup = function(e)
    {
        camera.onKeyUp(e);
    }

    canvas.onmousedown = function(e)
    {
        camera.onMouseDown(e);
    }

    canvas.onmousemove = function(e)
    {
        camera.onMouseMove(e);
    }

    canvas.onmouseup = function(e)
    {
        camera.onMosueUp(e);
    }

    var colorPass = function()
    {
        view = camera.getViewMatrix();

        lightShader.bindProgram();
        gl.uniformMatrix4fv(lightShader.uniforms.projection, false, projection.data);
        gl.uniformMatrix4fv(lightShader.uniforms.view, false, view.data);
        gl.uniform3f(lightShader.uniforms.camPosition, camera.pos.x, camera.pos.y, camera.pos.z);
        lightShader.sendDirLight(dirLight);

        //draw ground
        planeDiffuse.bind(0);
        planeNormal.bind(1);
        gl.uniformMatrix4fv(lightShader.uniforms.world, false, worldPlane.data);
        gl.uniform1f(lightShader.uniforms.uvRepeat, 10.0);
        lightShader.sendMaterial(planeMaterial);
        planeModel.bind();
        lightShader.bindAttributes();
        planeModel.draw();

        //draw rock
        rockDiffuse.bind(0);
        rockNormal.bind(1);
        gl.uniform1f(lightShader.uniforms.uvRepeat, 1.0);
        lightShader.sendMaterial(rockMaterial);
        rockModel.bind();
        lightShader.bindAttributes();

        for(var i = 0; i < rockLocations.length; i++)
        {
            var loc= rockLocations[i];
            gl.uniformMatrix4fv(lightShader.uniforms.world, false, MatrixTranslate(loc.x, loc.y, loc.z).data);
            rockModel.draw();
        }


        //draw crate
        crateDiffuse.bind(0);
        crateNormal.bind(1);
        gl.uniform1f(lightShader.uniforms.uvRepeat, 1.0);
        lightShader.sendMaterial(crateMaterial);
        crateModel.bind();
        lightShader.bindAttributes();

        for(var i = 0; i < crateLocations.length; i++)
        {
            var loc= crateLocations[i];
            gl.uniformMatrix4fv(lightShader.uniforms.world, false, MatrixTranslate(loc.x, loc.y, loc.z).data);
            crateModel.draw();
        }

        //draw house
        houseDiffuse.bind(0);
        houseNormal.bind(1);
        gl.uniformMatrix4fv(lightShader.uniforms.world, false, worldHouse.data);
        gl.uniform1f(lightShader.uniforms.uvRepeat, 1.0);
        lightShader.sendMaterial(houseMaterial);
        houseModel.bind();
        lightShader.bindAttributes();
        houseModel.draw();

        //draw fountain
        fountainDiffuse.bind(0);
        fountainNormal.bind(1);
        gl.uniformMatrix4fv(lightShader.uniforms.world, false, worldFountain.data);
        gl.uniform1f(lightShader.uniforms.uvRepeat, 1.0);
        lightShader.sendMaterial(fountainMaterial);
        fountainModel.bind();
        lightShader.bindAttributes();
        fountainModel.draw();

        //draw skybox
        skyboxShader.bindProgram();
        gl.uniformMatrix4fv(skyboxShader.uniforms.projection, false, projection.data);
        gl.uniformMatrix4fv(skyboxShader.uniforms.view, false, view.data);
        skyboxTexture.bind(0);
        skyboxModel.bind();
        skyboxShader.bindAttributes();
        skyboxModel.draw();

    }
}
