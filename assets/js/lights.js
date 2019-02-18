
$(document).ready(function() {

  firstHeight = 450;
  myScale = 0.85;
  totalLayers = 60;
  lag = 50;


  $(".light").css({position: "absolute"});
  lightStatus = 1


  for (i = 2; i <= totalLayers; i++) {
    $("#lightBox").append(
      "<img class='light' id='light"
      + i.toString() + "'"
      + "src='assets/img/lights.svg' alt='light layer'"
      + "style='position:absolute'"
      + "/>"
    )
  }

  //***********
  // Impulse
  //***********

  for (i = 1; i <= totalLayers; i++) {
    myLight = "#light" + i.toString();
    myHeight = firstHeight * (myScale)**(i-1);
    $(myLight).css({height: myHeight});
    $(myLight).attr('draggable', false);}

  function impulseOff(lightNum, status) {
      return function() {
        myLight = "#light" + lightNum.toString();
        if (status == 1) {
          $(myLight).css({opacity: 0.1});
          lightStatus = 0;
        } else {
          $(myLight).css({opacity: 1});
          lightStatus = 1;}}}

  function impulseHelper() {
    for (i = 1; i <= totalLayers; i++){
      window.setTimeout(impulseOff(i, lightStatus), lag * (i-1));}}

  window.onkeypress = impulseHelper;

  //***********
  // Parallax
  //***********

  myPositions = [];

  for (i = 1; i <= totalLayers; i++) {
    lightNum = i;
    myLight = "#light" + lightNum.toString();
    myLeft = parseInt($(myLight).css("left").slice(0, -2));
    myBottom = parseInt($(myLight).css("bottom").slice(0, -2));
    myPositions.push([myLeft, myBottom]);
  }

  yCenter = $(window).scrollTop() + $(window).height() / 2;
  xCenter = $(window).width() / 2;



  $(document).mousemove(function(event) {
        let xPos = event.pageX;
        let yPos = event.pageY;
        deltaX = xPos - xCenter;
        deltaY = yPos - yCenter;

        for (i = 1; i <= totalLayers; i++) {
          lightNum = i;
          myLight = "#light" + lightNum.toString();
          myLeft = myPositions[i - 1][0];
          myBottom = myPositions[i - 1][1];

          $(myLight).css({left: myLeft - deltaX/xCenter*i*50, bottom: myBottom + deltaY/yCenter*i*50});

        }




    });




});
