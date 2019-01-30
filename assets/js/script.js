$(document).ready(function() {

    $(window).resize(function() {
      windowWidth = $(window).width();
      //console.log(windowWidth)
      if (windowWidth < 1000) {
        $("#campanile").css({opacity: windowWidth * 0.001})
      }
    })




});
