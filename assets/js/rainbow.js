
$(document).ready(function() {
  spawnHeight = $("#whiteSquare").height();
  boxHeight = $(".rainbowBox").height();
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
