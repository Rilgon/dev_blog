function RenderTexture(gl, width, height, hasColorBuffer)
{
    this.create = function()
    {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

        gl.bindTexture(gl.TEXTURE_2D, this.depthTex);
        var ext = gl.getExtension('WEBGL_depth_texture');
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, width, height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTex, 0);

        if(hasColorBuffer)
        {
            gl.bindTexture(gl.TEXTURE_2D, this.colorTex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorTex, 0);
        }

        
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    this.fbo = gl.createFramebuffer();
    this.depthTex = gl.createTexture();
    this.colorTex = hasColorBuffer === true ? gl.createTexture() : null;
    this.clearFlag = hasColorBuffer === true ? gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT : gl.DEPTH_BUFFER_BIT;
    this.create();

    this.bind = function()
    {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        gl.viewport(0, 0, width, height);
        gl.clearColor(0.6, 0.6, 0.6, 1.0);
        gl.clear(this.clearFlag);
    }
}