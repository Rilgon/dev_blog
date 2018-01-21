var Quaternion = function()
{
    return {
        x: 0,
        y: 0,
        z: 0,
        w: 1,

        axisAngle : function(axis, angle)
        {
            const sinHalfAngle = Math.sin(angle * 0.5);
            this.x = axis.x * sinHalfAngle;
            this.y = axis.y * sinHalfAngle;
            this.z = axis.z * sinHalfAngle;
            this.w =  Math.cos(angle * 0.5);
        },

        set : function(x, y, z, w)
        {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        },

        mul: function(two)
        {
            const ret = Quaternion();
            ret.x = ((two.x * this.w) + (two.y * this.z) - (two.z * this.y) + (two.w * this.x));
            ret.y = (-(two.x * this.z) + (two.y * this.w) + (two.z * this.x) + (two.w * this.y));
            ret.z = ((two.x * this.y) - (two.y * this.x) + (two.z * this.w) + (two.w * this.z));
            ret.w = (two.x * this.x) - (two.y * this.y) - (two.z * this.z) + (two.w * this.w);
            return ret;
        },

        rotateVector : function(vec)
        {
            var vecQuat = Quaternion();
            vecQuat.set(vec.x, vec.y, vec.z, 0.0);

            const conjugate = Quaternion();
            conjugate.set(-this.x, -this.y, -this.z, this.w);

            vecQuat = conjugate.mul(vecQuat);

            vecQuat = vecQuat.mul(this);
            return Vec3(vecQuat.x, vecQuat.y, vecQuat.z);
        },

        print : function()
        {
            console.log('x: ' + this.x + ' y: ' + this.y + ' z: ' + this.z + ' w: ' + this.w);
        }
    }
}