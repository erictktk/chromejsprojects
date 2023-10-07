document.getElementById("rearrange").addEventListener("click", masterFunction )


function masterFunction(){
    console.log("clicked button!")
    getDataFromServer();
}

function sendDataToContent(responseText){
    var jsonDict = JSON.parse(responseText);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, jsonDict, function(response) {
        console.log(response.farewell);
        });
    });
}

function getDataFromServer(){
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
      if (request.readyState==4 && request.status==200){
            console.log("get successful!");
            sendDataToContent(request.responseText);
      }
    }
    request.open("GET", "http://localhost:5000/");
    request.send(null);
}
