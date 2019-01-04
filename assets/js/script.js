$(document).ready(function() {
    $(document).mousemove(function(event) {
        let xPos = event.pageX;
        let yPos = event.pageY;
        $("#bigcircle").css({left: 820-(xPos/100), position:'absolute'});
        $("#smallcircle").css({left: 740-(xPos/90), position:'absolute'});
    });

});
