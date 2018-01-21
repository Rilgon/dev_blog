var BasicShader = function(gl)
{
    const vs_code = 
        'attribute vec3 position;\n' + 
        'uniform mat4 world;\n' + 
        'uniform mat4 view;\n' + 
        'uniform mat4 projection;\n' + 
        'varying highp vec4 pos;\n' + 
        'void main() {\n' + 
        'gl_Position = projection * view * world * vec4(position, 1.0);\n' + 
        'pos = position;\n' +
        '}';

    const fs_code = 
        'precision highp float;\n' + 
        'varying highp vec4 pos;\n' + 
        'void main() {\n' + 
        'gl_FragColor = normalize(pos + 1.0 * 0.5);\n' + 
        '}';

    var shader = new Shader(gl, vs_code, fs_code);

    return {
        uniforms:  {
            world: gl.getUniformLocation(shader.program, 'world'),
            view: gl.getUniformLocation(shader.program, 'view'),
            projection : gl.getUniformLocation(shader.program, 'projection'),
        },

        attributes: {
            position: gl.getAttribLocation(shader.program, 'position'),
        },

        bindProgram : function() {
            shader.bind();
        },

        bindAttributes : function() 
        {
            gl.enableVertexAttribArray(this.attributes.position);
            gl.vertexAttribPointer(this.attributes.position, 3, gl.FLOAT, false, 48, 0);
        },

        unbindAttributes : function()
        {
            gl.disableVertexAttribArray(this.attributes.position);
        }
    };
}

var TextureShader = function(gl)
{
    const vs_code = 
        'attribute vec4 position;\n' + 
        'attribute vec2 uv;\n' + 
        'uniform mat4 world;\n' + 
        'uniform mat4 view;\n' + 
        'uniform mat4 projection;\n' + 
        'varying highp vec2 fragUV;\n' + 
        'void main() {\n' + 
        'gl_Position = projection * view * world * position;\n' + 
        'fragUV = uv;\n' +
        '}';

    const fs_code = 
        'precision highp float;\n' + 
        'varying highp vec2 fragUV;\n' + 
        'uniform sampler2D mSampler;\n' + 
        'void main() {\n' + 
        'gl_FragColor = texture2D(mSampler, vec2(fragUV.x, 1.0 - fragUV.y));\n' + 
        '}';

    var shader = new Shader(gl, vs_code, fs_code);

    return {
        uniforms:  {
            world: gl.getUniformLocation(shader.program, 'world'),
            view: gl.getUniformLocation(shader.program, 'view'),
            projection : gl.getUniformLocation(shader.program, 'projection'),
        },

        attributes: {
            position: gl.getAttribLocation(shader.program, 'position'),
            uv: gl.getAttribLocation(shader.program, 'uv'),
        },

        bindProgram : function() {
            shader.bind();
        },

        bindAttributes : function() 
        {
            gl.enableVertexAttribArray(this.attributes.position);
            gl.vertexAttribPointer(this.attributes.position, 3, gl.FLOAT, false, 48, 0);

            gl.enableVertexAttribArray(this.attributes.uv);
            gl.vertexAttribPointer(this.attributes.uv, 2, gl.FLOAT, false, 48, 24);
        },

        unbindAttributes : function()
        {
            gl.disableVertexAttribArray(this.attributes.position);
            gl.disableVertexAttribArray(this.attributes.uv);
        }
    };
}

var TextureLightShader = function(gl)
{
    var shader = new Shader(gl, document.getElementById('texlit_vs').innerHTML, document.getElementById('texlit_fs').innerHTML);
    shader.bind();

    gl.uniform1i(gl.getUniformLocation(shader.program, 'mDiffuseSampler'), 0);
    gl.uniform1i(gl.getUniformLocation(shader.program, 'mNormalSampler'), 1);
    gl.uniform1i(gl.getUniformLocation(shader.program, 'mShadowMap'), 2);

    shader.unbind();

    return {
        uniforms:  {
            world: gl.getUniformLocation(shader.program, 'world'),
            view: gl.getUniformLocation(shader.program, 'view'),
            projection : gl.getUniformLocation(shader.program, 'projection'),
            camPosition: gl.getUniformLocation(shader.program, 'camPosition'),
            shadowMatrix : gl.getUniformLocation(shader.program, 'shadowMatrix'),
            uvRepeat: gl.getUniformLocation(shader.program, 'uvRepeat'),
            matDiffuse: gl.getUniformLocation(shader.program, 'material.diffuse'),
            matSpecular: gl.getUniformLocation(shader.program, 'material.specular'),
            matSpecExponent: gl.getUniformLocation(shader.program, 'material.specExponent'),
            matHasNormalMap: gl.getUniformLocation(shader.program, 'material.hasNormalMap'),
            dirLightColor: gl.getUniformLocation(shader.program, 'dirLight.color'),
            dirLightDirection: gl.getUniformLocation(shader.program, 'dirLight.direction')
        },

        attributes: {
            position: gl.getAttribLocation(shader.program, 'position'),
            normal: gl.getAttribLocation(shader.program, 'normal'),
            uv: gl.getAttribLocation(shader.program, 'uv'),
            tangent: gl.getAttribLocation(shader.program, 'tangent'),
        },

        bindProgram : function() {
            shader.bind();
        },

        bindAttributes : function() 
        {
            gl.enableVertexAttribArray(this.attributes.position);
            gl.vertexAttribPointer(this.attributes.position, 3, gl.FLOAT, false, 48, 0);

            gl.enableVertexAttribArray(this.attributes.normal);
            gl.vertexAttribPointer(this.attributes.normal, 3, gl.FLOAT, false, 48, 12);

            gl.enableVertexAttribArray(this.attributes.uv);
            gl.vertexAttribPointer(this.attributes.uv, 2, gl.FLOAT, false, 48, 24);

            gl.enableVertexAttribArray(this.attributes.tangent);
            gl.vertexAttribPointer(this.attributes.tangent, 3, gl.FLOAT, false, 48, 32);
        },

        unbindAttributes : function()
        {
            gl.disableVertexAttribArray(this.attributes.position);
            gl.disableVertexAttribArray(this.attributes.uv);
        },

        sendMaterial : function(mat)
        {
            gl.uniform3f(this.uniforms.matDiffuse, mat.diffuse.x, mat.diffuse.y, mat.diffuse.z);
            gl.uniform3f(this.uniforms.matSpecular, mat.specular.x, mat.specular.y, mat.specular.z);
            gl.uniform1f(this.uniforms.matSpecExponent, mat.specExponent);
            gl.uniform1i(this.uniforms.matHasNormalMap, mat.hasNormalMap);
        },

        sendDirLight : function(dirLight)
        {
            gl.uniform3f(this.uniforms.dirLightColor, dirLight.color.x,  dirLight.color.y,  dirLight.color.z);
            gl.uniform3f(this.uniforms.dirLightDirection, dirLight.direction.x, dirLight.direction.y, dirLight.direction.z);
        },
    };
}

var SkyboxShader = function(gl)
{
    const vs_code = 
        'attribute vec3 position;\n' + 
        'uniform mat4 view;\n' + 
        'uniform mat4 projection;\n' + 
        'varying highp vec3 pos;\n' + 
        'void main() {\n' + 
        'mat4 tmp = view;\n' + 
        'tmp[3]= vec4(0.0, 0.0, 0.0, 1.0);\n' + 
        'gl_Position = projection * tmp * vec4(position, 1.0);\n' + 
        'gl_Position = gl_Position.xyww;\n' + 
        'pos = position;\n' +
        '}';

    const fs_code = 
        'precision highp float;\n' + 
        'varying highp vec3 pos;\n' + 
        'uniform samplerCube skybox;\n' + 
        'void main() {\n' + 
        'gl_FragColor = textureCube(skybox, pos);\n' + 
        '}';

    var shader = new Shader(gl, vs_code, fs_code);

    return {
        uniforms:  {
            world: gl.getUniformLocation(shader.program, 'world'),
            view: gl.getUniformLocation(shader.program, 'view'),
            projection : gl.getUniformLocation(shader.program, 'projection'),
        },

        attributes: {
            position: gl.getAttribLocation(shader.program, 'position'),
        },

        bindProgram : function() {
            shader.bind();
        },

        bindAttributes : function() 
        {
            gl.enableVertexAttribArray(this.attributes.position);
            gl.vertexAttribPointer(this.attributes.position, 3, gl.FLOAT, false, 48, 0);
        },

        unbindAttributes : function()
        {
            gl.disableVertexAttribArray(this.attributes.position);
        }
    };
}

var DepthShader = function(gl)
{
    const vs_code = 
        'attribute vec3 position;\n' + 
        'uniform mat4 world;\n' + 
        'uniform mat4 view;\n' + 
        'uniform mat4 projection;\n' + 
        'void main() {\n' + 
        'gl_Position = projection * view * world * vec4(position, 1.0);\n' + 
        '}';

    const fs_code = 
        'void main() {\n' + 
        '}';

    var shader = new Shader(gl, vs_code, fs_code);

    return {
        uniforms:  {
            world: gl.getUniformLocation(shader.program, 'world'),
            view: gl.getUniformLocation(shader.program, 'view'),
            projection : gl.getUniformLocation(shader.program, 'projection'),
        },

        attributes: {
            position: gl.getAttribLocation(shader.program, 'position'),
        },

        bindProgram : function() {
            shader.bind();
        },

        bindAttributes : function() 
        {
            gl.enableVertexAttribArray(this.attributes.position);
            gl.vertexAttribPointer(this.attributes.position, 3, gl.FLOAT, false, 48, 0);
        },

        unbindAttributes : function()
        {
            gl.disableVertexAttribArray(this.attributes.position);
        }
    };
}
