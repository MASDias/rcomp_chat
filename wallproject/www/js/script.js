var mArea;
var wallname;
var message, wall, wallcontent; // defined only after the document is loaded
var msgNum;
var delWall;
var wallRefresh;

function loadAndStart() {
  delWall= document.getElementById("idDeleteWall");
  mArea = document.getElementById("wallcontent");
  message = document.getElementById("usermsg");
  msgNum = document.getElementById("msgid");
  wall = document.getElementById("idwall");
  wallcontent = document.getElementById("wallcontent");
  setTimeout(updateWall, 1000);
}

function updateWall() {
  var request = new XMLHttpRequest();
  mArea.style.color = "black";
  
  request.onload = function() {
    mArea.innerHTML = this.responseText;
    mArea.scrollTop = mArea.scrollHeight; // scroll the textarea to make last lines visible
    setTimeout(updateWall, 1000);
  };

  request.onerror = function() {
    nextMsg = 0;
    mArea.value = "Server not responding.";
    mArea.style.color = "red";
    setTimeout(updateWall, 1000);
  };

  request.ontimeout = function() {
    nextMsg = 0;
    mArea.value = "Server not responding.";
    mArea.style.color = "red";
    setTimeout(updateWall, 1000);
  };

  request.open("GET", "/walls/" + wall.value, true);
  request.timeout = 10000;
  // Message 0 is a server's greeting, it should always exist
  // no timeout, for following messages, the server responds only when the requested
  // message number exists
  if(wall.value!==""){
    request.send();
  }
}

function sendMessageToWall() {
  var request = new XMLHttpRequest();
  request.open("POST", "/walls/" + wall.value + "/" + message.value, true);
  if(message.value!==""){
    request.send();
    updateWall();
  }
  message.value="";
}

function deleteMessageFromWall() {
    var request = new XMLHttpRequest();
    request.open("DELETE", "/walls/" + wall.value + "/" + message.value + "/" + msgNum.value, true);
    if(msgNum.value!==""){
      request.send();
      updateWall();
    }
    msgNum.value="";
  }

function deleteWall() {
    var request = new XMLHttpRequest();
    request.open("DELETE", "/walls/delete/" + delWall.value, true);
    if(delWall.value!==""){
      request.send();
      updateWall();
    }

    delWall.value="";
  }