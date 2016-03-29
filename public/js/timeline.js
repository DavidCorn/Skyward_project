$(document).ready(function documentReady() {

  $("#button-find-partner").mousedown(function buttonMouseDown() {
    $(this).removeClass("btn-onmouseup").addClass("btn-onmousedown");
  });
  
  $("#button-find-partner").mouseup(function buttonMouseUp() {
    $(this).removeClass("btn-onmousedown").addClass("btn-onmouseup");
  });

  $("#button-find-partner").click(function buttonClick() {
    window.location.href="./partner.html";
  });

});
