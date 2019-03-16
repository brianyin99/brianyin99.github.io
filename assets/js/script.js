$(document).ready(function() {

    $(window).resize(function() {
      windowWidth = $(window).width();
      console.log(windowWidth);
      if (windowWidth < 1000) {
        $("#campanile").css({opacity: windowWidth * 0.001});
      }

      fontSize = Math.min(40, windowWidth / 18);
      $("h1").css({'font-size': fontSize});


    })




});
