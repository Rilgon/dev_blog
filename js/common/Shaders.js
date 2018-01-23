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
    const vs_code = 
    'attribute vec3 position;\n' + 
    'attribute vec3 normal;\n' + 
    'attribute vec2 uv;\n' + 
    'attribute vec3 tangent;\n' +
    
    'uniform mat4 world;\n' + 
    'uniform mat4 view;\n' + 
    'uniform mat4 projection;\n' + 
    'uniform vec3 camPosition;\n' +
    
    'varying vec2 fragUV;\n' + 
    'varying vec3 fragWorld;\n' +
    'varying vec3 fragView;\n' +
    'varying mat3 TBN;\n' + 
    
    'void main() {\n' +
    '    vec4 worldPos = world * vec4(position, 1.0);\n' +
    '    gl_Position = projection * view * worldPos;\n' + 
    '    fragUV = uv;\n' +
    '    vec3 bitangent = cross(tangent, normal);\n' + 
    '    TBN = mat3(vec3(world * vec4(tangent, 0.0)), vec3(world * vec4(bitangent, 0.0)), vec3(world * vec4(normal, 0.0)));\n' + 
    '    fragWorld = worldPos.xyz;\n' +
    '    fragView = camPosition - fragWorld;\n' +
    '}';

    const fs_code = 
    'precision highp float;\n' +
    
    'varying vec2 fragUV;\n' + 
    'varying vec3 fragWorld;\n' +
    'varying vec3 fragView;\n' +
    'varying mat3 TBN;\n' + 
    
    'uniform sampler2D mDiffuseSampler;\n' +
    'uniform sampler2D mNormalSampler;\n' +
    
    'uniform float uvRepeat;\n' +
    
    'uniform struct Material\n' +
    '{\n' +
    '    vec3 diffuse;\n' +
    '    vec3 specular;\n' +
    '    float specExponent;\n' +
    '    int hasNormalMap;\n' +
    '} material;\n' +
    
    'uniform struct DirLight\n' +
    '{\n' +
    '    vec3 color;\n' +
    '    vec3 direction;\n' +
    '} dirLight;\n' +
    
    'vec3 blinnPhong(vec3 lightDirection, vec3 lightColor, vec3 normal, vec3 view)\n' +
    '{\n' +
    '    float diffuse = max(dot(lightDirection, normal), 0.0);\n' +
    
    '    vec3 reflected = reflect(-lightDirection, normal);\n' +
    '    float spec = max(dot(reflected, view), 0.0);\n' +
    '    spec = pow(spec, material.specExponent);\n' +
    
    '    return \n' +
    '    lightColor * ((diffuse * material.diffuse) +\n' +
    '    (spec * material.specular));\n' +
    '}\n' +
    
    'void main() {\n' +
    '    vec3 texColor = texture2D(mDiffuseSampler, uvRepeat * vec2(fragUV.x, 1.0 - fragUV.y)).rgb;\n' +
    
    '    vec3 normal = vec3(0, 0, 0);\n' +
    '    if(material.hasNormalMap == 1)\n' +
    '    {\n' +
    '        normal = texture2D(mNormalSampler, vec2(fragUV.x, 1.0 - fragUV.y)).rgb;\n' +
    '        normal *= 2.0;\n' +
    '        normal -= 1.0;\n' +
    '        normal = normalize(normal);\n' +
    '        normal = normalize(TBN * normal);\n' +
    '    }\n' +
    '    else\n' +
    '    {\n' +
    '        normal = normalize(TBN[2]);\n' +
    '    }\n' +
    
    '    vec3 view = normalize(fragView);\n' +
    
    '    vec3 colorFromLight = blinnPhong(dirLight.direction, dirLight.color, normal, view);\n' +
    '    gl_FragColor.rgb = texColor * colorFromLight;\n' +
    '    gl_FragColor.a = 1.0;\n' +
    '}\n';

    var shader = new Shader(gl, vs_code, fs_code);
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

var BasicPostShader = function(gl)
{
    const vs_code = 
        'attribute vec4 position;\n' + 
        'attribute vec2 uv;\n' + 
        'varying highp vec2 fragUV;\n' + 
        'void main() {\n' + 
        'gl_Position = position;\n' + 
        'fragUV = vec2(uv.x, 1.0 - uv.y);\n' +
        '}';

    const fs_code = 
        'const int POST_NONE = 0;\n' + 
        'const int POST_SMOOTH = 1;\n' + 
        'const int POST_GRAYSCALE = 2;\n' + 
        'const int POST_LAPLACE = 3;\n' + 
        'precision highp float;\n' + 
        'varying highp vec2 fragUV;\n' + 
        'uniform sampler2D mSampler;\n' + 
        'uniform float invWidth;\n' + 
        'uniform float invHeight;\n' + 
        'uniform int postEffect;\n' + 
        'void main() {\n' + 
        'if(postEffect == POST_NONE) {\n' + 
            'gl_FragColor = texture2D(mSampler, fragUV);\n' + 
        '}\n' + 
        'else if(postEffect == POST_SMOOTH) {\n' + 
            'vec4 avgColor = vec4(0.0, 0.0, 0.0, 0.0);\n' + 
        '   for(int i = -2; i <= 2; i++) {\n' + 
        '       for(int j = -2; j <= 2; j++) {\n' + 
        '           avgColor += texture2D(mSampler, fragUV + vec2(float(j) * invWidth, float(i) * invHeight));\n' + 
        '        }\n' + 
        '   }\n' + 
        '   avgColor /= 25.0;\n' + 
        '   gl_FragColor = avgColor;\n' + 
        '}\n' + 
        'else if(postEffect == POST_GRAYSCALE) {\n' + 
        '   gl_FragColor = texture2D(mSampler, fragUV);\n' + 
        '   float grayScale = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;\n' + 
        '   gl_FragColor = vec4(grayScale, grayScale, grayScale, 1.0);\n' + 
        '}\n' + 
        'else if(postEffect == POST_LAPLACE) {\n' + 
        '   gl_FragColor = texture2D(mSampler, fragUV) * 4.0;\n' + 
        '   gl_FragColor += texture2D(mSampler, fragUV + vec2(-invWidth, 0.0)) * -1.0;\n' + 
        '   gl_FragColor += texture2D(mSampler, fragUV + vec2(invWidth, 0.0)) * -1.0;\n' + 
        '   gl_FragColor += texture2D(mSampler, fragUV + vec2(0.0, -invHeight)) * -1.0;\n' + 
        '   gl_FragColor += texture2D(mSampler, fragUV + vec2(0.0, invHeight)) * -1.0;\n' + 
        '}\n' + 
        '}';

    var shader = new Shader(gl, vs_code, fs_code);

    return {
        uniforms:  {
            invWidth: gl.getUniformLocation(shader.program, 'invWidth'),
            intHeight: gl.getUniformLocation(shader.program, 'invHeight'),
            postEffect: gl.getUniformLocation(shader.program, 'postEffect'),
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