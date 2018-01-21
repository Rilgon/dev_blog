var main = function()
{
    var context = document.getElementById('gl');
    var gl = context.getContext('experimental-webgl');

    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var req = new XMLHttpRequest();
    req.onload = function(e)
    {
        var data = req.response;

        console.log(data.name);
    }

    var siteRoot = document.getElementById('siteRoot').innerHTML;

    req.open('GET', siteRoot + 'models/test.json');
    req.responseType = 'json';
    req.send();
    
    console.log('js working?');
}


main();
