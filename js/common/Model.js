function EmptyModel()
{
    this.bind = function()
    {
    }

    this.draw = function()
    {
    }

    this.unbind = function()
    {
    }
}

function Model(gl, vertices, numVertices, indices, numIndices)
{
    this.create = function()
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, undefined);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, undefined);
    }

    this.vbo = gl.createBuffer(gl.ARRAY_BUFFER);
    this.ebo = gl.createBuffer(gl.ELEMENT_ARRAY_BUFFER);
    this.numVertices = numVertices;
    this.numIndices = numIndices;
    this.create();

    this.bind = function()
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    }

    this.draw = function()
    {
        gl.drawElements(gl.TRIANGLES, this.numIndices, gl.UNSIGNED_SHORT, 0);
    }

    this.unbind = function()
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, undefined);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, undefined);
    }
}