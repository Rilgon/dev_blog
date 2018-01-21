function EmptyCubemap()
{
    this.bind = function(texSlot)
    {
    }

    this.unbind = function(texSlot)
    {
    }
}


function Cubemap(gl, images)
{
    this.create = function()
    {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.tex);

        for(var i = 0; i < images.length; i++)
        {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[i]);
        }
        
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);


        gl.bindTexture(gl.TEXTURE_CUBE_MAP, undefined);
    },

    this.tex = gl.createTexture();
    this.create();

    this.bind = function(texSlot)
    {
        gl.activeTexture(gl.TEXTURE0 + texSlot);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.tex);
    }

    this.unbind = function()
    {
        gl.activeTexture(gl.TEXTURE0 + texSlot);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, undefined);
    }
}