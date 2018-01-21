var Vec3 = function(_x, _y, _z)
{
    return {
        x: _x,
        y: _y,
        z: _z,

        diff: function(two) 
        {
            return Vec3(this.x - two.x, this.y - two.y, this.z - two.z);
        },

        sub: function(two)
        {
            this.x -= two.x;
            this.y -= two.y;
            this.z -= two.z;
        },

        sum: function(two)
        {
            return Vec3(this.x + two.x, this.y + two.y, this.z + two.z);
        },

        add: function(two)
        {
            this.x += two.x;
            this.y += two.y;
            this.z += two.z;
        },

        scalarProduct: function(two)
        {
            return Vec3(this.x * two, this.y * two, this.z * two);
        },

        scale: function(two)
        {
            this.x *= two;
            this.y *= two;
            this.z *= two;
        },

        dot: function(two)
        {
            return this.x * two.x + this.y * two.y + this.z * two.z;
        },

        cross: function(two)
        {
            return Vec3(this.y * two.z - this.z * two.y, this.z * two.x - this.x * two.z, this.x * two.y - this.y * two.x);
        },

        norm: function()
        {
            var lenSqr = this.x * this.x + this.y * this.y + this.z * this.z;
            if(Math.abs(lenSqr) > 0.0001)
            {
                lenSqr = 1.0 / Math.sqrt(lenSqr);
                this.x *= lenSqr;
                this.y *= lenSqr;
                this.z *= lenSqr;
            }
        },

        getNorm: function()
        {
            var lenSqr = this.x * this.x + this.y * this.y + this.z * this.z;
            if(Math.abs(lenSqr) > 0.0001)
            {
                lenSqr = 1.0 / Math.sqrt(lenSqr);
                return Vec3(this.x * lenSqr, this.y * lenSqr, this.z * lenSqr);
            }
            return Vec3(0, 0, 0);
        },

        print: function()
        {
            console.log('x: ' + this.x + ' y: ' + this.y + ' z: ' + this.z);
        },
    }
}