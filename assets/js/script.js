$(document).ready(function() {
    $(document).mousemove(function(event) {
        let xPos = event.pageX;
        let yPos = event.pageY;

        console.log(xPos);
        $("#lefteye").css({right: 40 - (xPos/200), top: 16 + (yPos/200) - 2, position:'absolute'});
        $("#righteye").css({right: 26 - (xPos/200), top: 16 + (yPos/200) - 2, position:'absolute'});
    });

});
