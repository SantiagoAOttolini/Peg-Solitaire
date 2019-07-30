var init = function(){
    var send = document.getElementById("buttonSumbit");
    send.onclick = SendEmail;
}
var SendEmail = function(){
    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    console.log(name,message);
    window.open('mailto:santiago.ottolini97@gmail.com?subject='+name+'&body='+message);
}

window.onload = init;