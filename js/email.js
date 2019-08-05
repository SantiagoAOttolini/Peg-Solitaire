var init = function() {
  var send = document.getElementById("button-sumbit");
  send.onclick = SendEmail;
};
var SendEmail = function() {
  var name = document.getElementById("name").value;
  var message = document.getElementById("message").value;
  if (message.length < 5) {
    alert("The message must have more than 5 characters");
    return {};
  }
  window.open(
    "mailto:santiago.ottolini97@gmail.com?subject=" + name + "&body=" + message
  );
};

window.onload = init;
