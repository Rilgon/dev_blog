function Shader(gl, vertexShader, fragmentShader)
{
    this.create = function()
    {
        gl.shaderSource(this.vs, vertexShader);
        gl.compileShader(this.vs);
        var compiled = gl.getShaderParameter(this.vs, gl.COMPILE_STATUS);
        if(compiled === false)
        {
            console.log('Vertex Shader error');
            console.log(gl.getShaderInfoLog(this.vs));
        }

        gl.shaderSource(this.fs, fragmentShader);
        gl.compileShader(this.fs);
        var compiled = gl.getShaderParameter(this.fs, gl.COMPILE_STATUS);
        if(compiled === false)
        {
            console.log('Fragment Shader error');
            console.log(gl.getShaderInfoLog(this.fs));
        }

        gl.attachShader(this.program, this.vs);
        gl.attachShader(this.program, this.fs);
        gl.linkProgram(this.program);
        gl.validateProgram(this.program);
        var linked = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if(linked === false)
        {
            console.log('Program link error');
            console.log(gl.getProgramInfoLog(this.program));
        }
        
    }

    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.program = gl.createProgram();
    this.uniforms = {};
    this.create();

    this.bind = function()
    {
        gl.useProgram(this.program);
    }

    this.unbind = function()
    {
        gl.useProgram(undefined);
    }
}