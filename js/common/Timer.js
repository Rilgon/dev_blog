function Timer()
{
    this.totalTime = 0.0;
    this.deltaTime = 0.0;
    this.fps = 0;
    this.prevTime = 0.0;
    this.fpsCounter = 0;

    this.update = function(time)
    {
        var newTime = time * 0.001;
        this.deltaTime = newTime - this.totalTime;
        this.totalTime = newTime;

        if(this.totalTime - this.prevTime > 1.0)
        {
            this.fps = this.fpsCounter;
            this.prevTime = this.totalTime;
            this.fpsCounter = 0;
        }
        else
        {
            this.fpsCounter++;
        }
    }
}