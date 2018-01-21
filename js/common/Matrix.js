var Matrix = function()
{
    return {
        data: [16],    

        mul: function(two)
        {
            var ret = Matrix();

            ret.data[0] = this.data[0] * two.data[0] + this.data[1] * two.data[4] + this.data[2] * two.data[8] + this.data[3] * two.data[12];
            ret.data[1] = this.data[0] * two.data[1] + this.data[1] * two.data[5] + this.data[2] * two.data[9] + this.data[3] * two.data[13];
            ret.data[2] = this.data[0] * two.data[2] + this.data[1] * two.data[6] + this.data[2] * two.data[10] + this.data[3] * two.data[14];
            ret.data[3] = this.data[0] * two.data[3] + this.data[1] * two.data[7] + this.data[2] * two.data[11] + this.data[3] * two.data[15];

            ret.data[4] = this.data[4] * two.data[0] + this.data[5] * two.data[4] + this.data[6] * two.data[8] + this.data[7] * two.data[12];
            ret.data[5] = this.data[4] * two.data[1] + this.data[5] * two.data[5] + this.data[6] * two.data[9] + this.data[7] * two.data[13];
            ret.data[6] = this.data[4] * two.data[2] + this.data[5] * two.data[6] + this.data[6] * two.data[10] + this.data[7] * two.data[14];
            ret.data[7] = this.data[4] * two.data[3] + this.data[5] * two.data[7] + this.data[6] * two.data[11] + this.data[7] * two.data[15];

            ret.data[8] = this.data[8] * two.data[0] + this.data[9] * two.data[4] + this.data[10] * two.data[8] + this.data[11] * two.data[12];
            ret.data[9] = this.data[8] * two.data[1] + this.data[9] * two.data[5] + this.data[10] * two.data[9] + this.data[11] * two.data[13];
            ret.data[10] = this.data[8] * two.data[2] + this.data[9] * two.data[6] + this.data[10] * two.data[10] + this.data[11] * two.data[14];
            ret.data[11] = this.data[8] * two.data[3] + this.data[9] * two.data[7] + this.data[10] * two.data[11] + this.data[11] * two.data[15];

            ret.data[12] = this.data[12] * two.data[0] + this.data[13] * two.data[4] + this.data[14] * two.data[8] + this.data[15] * two.data[12];
            ret.data[13] = this.data[12] * two.data[1] + this.data[13] * two.data[5] + this.data[14] * two.data[9] + this.data[15] * two.data[13];
            ret.data[14] = this.data[12] * two.data[2] + this.data[13] * two.data[6] + this.data[14] * two.data[10] + this.data[15] * two.data[14];
            ret.data[15] = this.data[12] * two.data[3] + this.data[13] * two.data[7] + this.data[14] * two.data[11] + this.data[15] * two.data[15];


            return ret;
        },

        print: function()
        {
            for(var i = 0; i < 15; i++)
            {
                console.log(this.data[i]);
            }
        }
    }
}

    var MatrixTranslate =  function(x, y, z)
    {
        const ret = Matrix();
        ret.data[0] = 1.0;
        ret.data[1] = 0.0;
        ret.data[2] = 0.0;
        ret.data[3] = 0.0;

        ret.data[4] = 0.0;
        ret.data[5] = 1.0;
        ret.data[6] = 0.0;
        ret.data[7] = 0.0;

        ret.data[8] = 0.0;
        ret.data[9] = 0.0;
        ret.data[10] = 1.0;
        ret.data[11] = 0.0;

        ret.data[12] = x;
        ret.data[13] = y;
        ret.data[14] = z;
        ret.data[15] = 1.0;
        return ret;
    }

    var MatrixScale =  function(x, y, z)
    {
        const ret = Matrix();
        ret.data[0] = x;
        ret.data[1] = 0.0;
        ret.data[2] = 0.0;
        ret.data[3] = 0.0;

        ret.data[4] = 0.0;
        ret.data[5] = y;
        ret.data[6] = 0.0;
        ret.data[7] = 0.0;

        ret.data[8] = 0.0;
        ret.data[9] = 0.0;
        ret.data[10] = z;
        ret.data[11] = 0.0;

        ret.data[12] = 0.0;
        ret.data[13] = 0.0;
        ret.data[14] = 0.0;
        ret.data[15] = 1.0;
        return ret;
    }

    MatrixRotX =  function(angle)
    {
        const ret = Matrix();
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        ret.data[0] = 1.0;
        ret.data[1] = 0.0;
        ret.data[2] = 0.0;
        ret.data[3] = 0.0;

        ret.data[4] = 0.0;
        ret.data[5] = cosAngle;
        ret.data[6] = sinAngle;
        ret.data[7] = 0.0;

        ret.data[8] = 0.0;
        ret.data[9] = -sinAngle;
        ret.data[10] = cosAngle;
        ret.data[11] = 0.0;

        ret.data[12] = 0.0;
        ret.data[13] = 0.0;
        ret.data[14] = 0.0;
        ret.data[15] = 1.0;
        return ret;
    }

    var MatrixRotY =  function(angle)
    {
        const ret = Matrix();
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        ret.data[0] = cosAngle;
        ret.data[1] = 0.0;
        ret.data[2] = -sinAngle;
        ret.data[3] = 0.0;

        ret.data[4] = 0.0;
        ret.data[5] = 1.0;
        ret.data[6] = 0.0;
        ret.data[7] = 0.0;

        ret.data[8] = sinAngle;
        ret.data[9] = 0.0;
        ret.data[10] = cosAngle;
        ret.data[11] = 0.0;

        ret.data[12] = 0.0;
        ret.data[13] = 0.0;
        ret.data[14] = 0.0;
        ret.data[15] = 1.0;
        return ret;
    }
    

    var MatrixPerspective = function(fovRadians, aspectRatio, n, f)
    {
        const ret = Matrix();
        const angle = Math.tan(fovRadians * 0.5) * n;
        const r = angle * aspectRatio;
        const l = -r;
        const t = angle;
        const b = -t;

        ret.data[0] = (2.0 * n) / (r - l);
        ret.data[1] = 0.0;
        ret.data[2] = 0.0;
        ret.data[3] = 0.0;

        ret.data[4] = 0.0;
        ret.data[5] = (2.0 * n) / (t - b);
        ret.data[6] = 0.0;
        ret.data[7] = 0.0;

        ret.data[8] = 0.0;
        ret.data[9] = 0.0;
        ret.data[10] = -(f + n) / (f - n);
        ret.data[11] = -1.0;

        ret.data[12] = 0.0;
        ret.data[13] = 0.0;
        ret.data[14] = -(2.0 * f * n) / (f - n);
        ret.data[15] = 0.0;
        return ret;
    }

    var MatrixOrthographic = function(l, r, b, t, n, f)
    {
        const ret = Matrix();

        ret.data[0] = 2.0 / (r - l);
        ret.data[1] = 0.0;
        ret.data[2] = 0.0;
        ret.data[3] = 0.0;

        ret.data[4] = 0.0;
        ret.data[5] = 2.0 / (t - b);
        ret.data[6] = 0.0;
        ret.data[7] = 0.0;

        ret.data[8] = 0.0;
        ret.data[9] = 0.0;
        ret.data[10] = 2 / (f - n);
        ret.data[11] = 0.0;

        ret.data[12] = -(r + l) / (r - l);
        ret.data[13] = -(t + b) / (t - b);
        ret.data[14] = -(f + n) / (f - n);
        ret.data[15] = 1.0;
        return ret;
    }

    var MatrixLookAt = function(eyePos, targetPos, upDir)
    {
        const ret = Matrix();
        var dir = eyePos.diff(targetPos);
        dir.norm();
        var right = upDir.cross(dir);
        right.norm();
        var up = dir.cross(right);

        ret.data[0] = right.x;
        ret.data[1] = up.x;
        ret.data[2] = dir.x;
        ret.data[3] = 0.0;

        ret.data[4] = right.y;
        ret.data[5] = up.y;
        ret.data[6] = dir.y;
        ret.data[7] = 0.0;

        ret.data[8] = right.z;
        ret.data[9] = up.z;
        ret.data[10] = dir.z;
        ret.data[11] = 0.0;

        ret.data[12] = -right.dot(eyePos);
        ret.data[13] = -up.dot(eyePos);
        ret.data[14] = -dir.dot(eyePos);
        ret.data[15] = 1.0;
        return ret;
    }

    var MatrixIdentity =  function()
    {
        const ret = Matrix();
        ret.data[0] = 1.0;
        ret.data[1] = 0.0;
        ret.data[2] = 0.0;
        ret.data[3] = 0.0;

        ret.data[4] = 0.0;
        ret.data[5] = 1.0;
        ret.data[6] = 0.0;
        ret.data[7] = 0.0;

        ret.data[8] = 0.0;
        ret.data[9] = 0.0;
        ret.data[10] = 1.0;
        ret.data[11] = 0.0;

        ret.data[12] = 0.0;
        ret.data[13] = 0.0;
        ret.data[14] = 0.0;
        ret.data[15] = 1.0;
        return ret;
    }