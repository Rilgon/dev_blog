function EmptyTexture()
{
    this.bind = function(texSlot)
    {
    }

    this.unbind = function(texSlot)
    {
    }
}


function Texture(gl, img)
{
    this.create = function()
    {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        var ext = gl.getExtension("EXT_texture_filter_anisotropic");
        gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, 8);

        gl.generateMipmap(gl.TEXTURE_2D);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);


        gl.bindTexture(gl.TEXTURE_2D, undefined);
    },

    this.tex = gl.createTexture();
    this.create();

    this.bind = function(texSlot)
    {
        gl.activeTexture(gl.TEXTURE0 + texSlot);
        gl.bindTexture(gl.TEXTURE_2D, this.tex);
    }

    this.unbind = function()
    {
        gl.activeTexture(gl.TEXTURE0 + texSlot);
        gl.bindTexture(gl.TEXTURE_2D, undefined);
    }
}