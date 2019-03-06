/**************************
Carousel
***************************/
const track = document.querySelector('.carouselTrack');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carouselButton--right');
const prevButton = document.querySelector('.carouselButton--left');
const dotsNav = document.querySelector('.carouselNav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide')
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const previousDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, previousDot);

  hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  // move to the next slide
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);

  hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

// when I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
  // what indicator was clicked on?
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);

  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});

/***************************
Rainbow Tunnel
***************************/

$(document).ready(function() {
  spawnHeight = $("#whiteSquare").height();
  boxHeight = $("#rainbowBox").height();
  midHeight = Math.pow(boxHeight, 2) / spawnHeight;

  setInterval(function () {
    tunnelHeight = $("#rainbowTunnel").height() * 1.01;
    tunnelOffset = (tunnelHeight - boxHeight) / 2;
    if (tunnelHeight - 76 < midHeight) {
      $("#rainbowTunnel").css({bottom: tunnelOffset, right: tunnelOffset, height: tunnelHeight});
    } else {
      $("#rainbowTunnel").css({height: boxHeight});
    }
  }, 10);
});

/***************************
Lights
***************************/


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
    $("#lightInstructions").css({display: 'none'});
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
