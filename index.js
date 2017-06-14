(function()
{
    "use strict";
    var secondsInYear = 31540000;
    var secondsInMonth = 2628000;
    var secondsInDay = 86400;
    var secondsInHour = 3600;
    var secondsInMinute = 60;
    var iterate = [
        {denom: secondsInYear, unit: 'year'},
        {denom: secondsInMonth, unit: 'month'},
        {denom: secondsInDay, unit: 'day'},
        {denom: secondsInHour, unit: 'hour'},
        {denom: secondsInMinute, unit: 'minute'},
        {denom: 1, unit: 'seconds'}
    ];
    var idsToReclass = ['#header', '#content'];

    var calculateOne = function(secondsLeft, denom, unit)
    {
        var string = "";
        if (secondsLeft >= denom)
        {
            var one = Math.floor(secondsLeft / denom);
            string += one + " " + unit;
            if (one !== 1)
                string += "s";
            
            secondsLeft -= (denom * one);
        }
        return {secondsLeft: secondsLeft, string: string};
    }

    var secondsToString = function(secondsLeft)
    {
        var asString = '';
        for (var idx = 0; idx < iterate.length - 1; ++idx)
        {
            var ret = calculateOne(secondsLeft, iterate[idx].denom, iterate[idx].unit);
            secondsLeft = ret.secondsLeft;
            if (0 !== asString.length && 0 !== ret.string.length)
                asString += ', ';
            if (0 !== ret.string.length)
                asString += ret.string;
        }

        if (0 !== asString.length)
            asString += ', and ';
        asString += Math.floor(secondsLeft) + ' seconds';
        return asString;
    }
    
    var timeLeft = function()
    {
        var current = new Date().getTime() / 1000;
        var cutoff = 1497380340; // Epoch seconds - 13 Jun, 2:15PM 
        return cutoff - current;
    }

    var redraw = function()
    {
        var secondsLeft = timeLeft();

        if(secondsLeft <= 0)
        {
            var string = "Yes!<br>I am " + secondsToString(Math.abs(secondsLeft)) + " old (and keeping Mom & Dad awake!)";
            $('#content').html(string);
            idsToReclass.forEach(function(id)
            {
                $(id).addClass('Victory');
                $(id).removeClass('Patience');
            });
        }
        else
        {
            var string = "Not yet, patience!<br>" + secondsToString(secondsLeft) + " left!";
            $('#content').html(string);
            idsToReclass.forEach(function(id)
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