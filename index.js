(function()
{
    "use strict";
    
    var timeLeft = function()
    {
        var current = new Date().getTime() / 1000;
        var cutoff = 1497377700; // Epoch seconds - 13 Jun, 2:15PM 
        return cutoff - current;
    }

    var redraw = function()
    {
        var secondsLeft = timeLeft();
        var ids = [ '#header', '#content'];

        if (secondsLeft <= 0)
        {
            $('#content').html('Yes');
            ids.forEach(function(id)
            {
                $(id).addClass('Victory');
                $(id).removeClass('Patience');
            });
        }
        else
        {
            var days = secondsLeft / 86400;
            var hours = ( ( days - Math.floor( days ) ) ) * 24;
            var minutes = ( ( hours - Math.floor( hours ) ) % 24 ) * 60;
            var seconds = ( ( minutes - Math.floor( minutes ) ) % 60 ) * 60;
            var string = "Not yet, patience! " + 
                Math.floor( days ) + " days " + 
                Math.floor( hours ) + " hours " + 
                Math.floor( minutes ) + " minutes, and " + 
                Math.floor( seconds) + " seconds left!";
            $('#content').html(string);
            ids.forEach(function(id)
            {
                $(id).removeClass('Victory');
                $(id).addClass('Patience');
            });
        }
    }

    $(document).ready(function()
    {
        console.log("Hello, world");
        redraw();
        setInterval(redraw, 1000); // every 1 second
    })
})();