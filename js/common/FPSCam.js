function FPSCam(timer)
{
    this.CAM_SPEED = 3.5;
    this.pos = Vec3(0, 5, 10);
    this.right = Vec3(1, 0, 0);
    this.up = Vec3(0, 1, 0);
    this.forward = Vec3(0, 0, -1);
    this.keys = {
        'w': false,
        's': false,
        'a': false,
        'd': false,
    };
    this.mouseData =  {
        x : 0,
        y : 0,
        isDown : false,
    };

    this.update = function()
    {
        if(this.keys['w'] === true)
        {
            this.pos.add(this.forward.scalarProduct(timer.deltaTime * this.CAM_SPEED));
        }
        if(this.keys['s'] === true)
        {
            this.pos.sub(this.forward.scalarProduct(timer.deltaTime * this.CAM_SPEED));
        }
        if(this.keys['a'] === true)
        {
            this.pos.add(this.right.scalarProduct(timer.deltaTime * this.CAM_SPEED));
        }
        if(this.keys['d'] === true)
        {
            this.pos.sub(this.right.scalarProduct(timer.deltaTime * this.CAM_SPEED));
        }
    }

    this.onKeyDown = function(e)
    {
        var key = e.key.toLowerCase();
        this.keys[key] = true;
    }

    this.onKeyUp = function(e)
    {
        var key = e.key.toLowerCase();
        this.keys[key] = false;
    }

    this.onMouseDown = function(e)
    {
        if(e.button == 0)
        {
            this.mouseData.x = e.clientX;
            this.mouseData.y = e.clientY;
            this.mouseData.isDown = true;
        }
    }

    this.onMouseMove = function(e)
    {
        if(this.mouseData.isDown === true)
        {
            var deltaX = (e.clientX - this.mouseData.x) * 0.005;
            var deltaY = (e.clientY - this.mouseData.y) * 0.005;

            const qRight = Quaternion();
            qRight.axisAngle(this.right, deltaY);

            this.up = qRight.rotateVector(this.up);
            this.forward = qRight.rotateVector(this.forward);

            const qUp = Quaternion();
            qUp.axisAngle(Vec3(0, 1, 0), -deltaX);

            this.up = qUp.rotateVector(this.up);
            this.forward = qUp.rotateVector(this.forward);

            this.right = this.up.cross(this.forward);
            this.right.norm();

            this.mouseData.x = e.clientX;
            this.mouseData.y = e.clientY;
        }
    }

    this.onMosueUp = function(e)
    {
        if(e.button == 0)
        {
            this.mouseData.isDown = false;
        }
    }

    this.getViewMatrix = function()
    {
        return MatrixLookAt(this.pos, this.pos.sum(this.forward), this.up);
    }
}