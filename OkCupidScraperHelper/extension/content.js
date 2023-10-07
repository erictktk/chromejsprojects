var interval;

/*
testURLList = ["www.", "wwww."];
testIsOnlineList = [true, false];
setTimeout( postRequestTrySeparate(testURLList, testIsOnlineList), 1000 );
*/

//setTimeout(masterFunction, 1000);
setTimeout(masterFunction, 1000);

function reloadTab(){
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
}

function masterFunction(){
    interval = setInterval(scrollToBottom, 20);
}

function testIfHasBucket(){
    var elements = document.getElementsByClassName("userrow-bucket-loading");
    if (elements.length == 0){
        return false;
    }
    else{
        return true;
    }
}

function scrollToBottom(){
    window.scrollBy(0,1000);
    if (testIfHasBucket() == false){
        clearInterval(interval);
        console.log("no more users!");
        upload();
        //write to file
    }
}

function postRequestTrySeparate(urlList, isOnlineList){
    profileList = [];
    for( var i = 0; i < urlList.length; i += 1){
        profileList.push(new Profile(urlList[i],isOnlineList[i]));
    }
    postRequestTry(profileList);
}

function postRequestTry(profileList){
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
      if (request.readyState==4 && request.status==200){
        //alert(request.status);
        console.log("post successful!");
      }
    }
    request.open("POST", "http://localhost:5000/update");
    request.send( JSON.stringify(profileList) );
}


function insertLastOnline(listOfProfiles){
    var elements = document.getElementsByTagName('a');

    //sort
    browserProfiles = []
    for(var i = 0; i < elements.length; i += 1){
        var insideElements = elements[i].getElementsByClassName("userrow")
        if (insideElements.length != 0){
            browserProfiles.push(elements[i]);
        }
    }
    
    //also sort browserProfiles by 
    for(var i =0; i < browserProfiles.length; i +=1 ){
        //find matching json profile
        curProfile = null;
        for( var j = 0; j < listOfProfiles.length; j += 1){
            if (listOfProfiles[j].url == browserProfiles[i].href){ 
                curProfile = listOfProfiles[j];
                break;
            }
        }
        if (curProfile != null){
            var lastOnlineString = curProfile.lastOnline;

            var curElements = browserProfiles[i].getElementsByClassName("userInfo-meta-location");
            if (curElements.length != null ){
                var innerHTML = curElements[i].innerHTML;
                innerHTML += ". Last online: " + lastOnlineString;
                curElements[i].innerHTML = innerHTML;
            }
        }
    }
}

function upload(){
    var listOfProfiles = getAllUsers();
    postRequestTry(listOfProfiles);
}

var jsonObject;

function getRequestTry(){
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
      if (request.readyState==4 && request.status==200){
        console.log("get successful!");
        // To get the response use request.responseText;
      }
    }
    request.open("GET", "http://localhost:5000/home");
    request.send(null);
}

var serverProfileList = [];

function getProfileList(){
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
      if (request.readyState==4 && request.status==200){
            console.log("get successful!");
            reassemblePage(request.responseText);
      }
    }
    request.open("GET", "http://localhost:5000/home");
    request.send(null);
}

function fillServerProfileList(text){
    console.log(text);
    JSON.parse(text);

    var obj = JSON.parse(data);
    for(var profileKey in obj){
        if (obj.hasOwnProperty(profileKey)){
            var lastOnlineString = obj[profileKey];
            serverProfileList.push( new Profile( profileKey, lastOnline = lastOnlineString));
        }
    }
}

function Profile(url, isOnline = null, lastOnline = null){
    this.url = url;
    this.isOnline = isOnline;
    this.lastOnline = lastOnline;
}

// check if this works
function getAllUsers(){
    listOfProfiles = []

    var elements = document.getElementsByTagName('a');
    for(var i = 0; i < elements.length; i += 1){
        var insideElements = elements[i].getElementsByClassName("usercard userrow-bucket-display-card")
        if (insideElements.length != 0 ){
            var href = elements[i].href;
            var isOnlineElements = elements[i].getElementsByClassName("onlinedot userInfo-username-online");
            var isOnline = false;
            if (isOnlineElements.length != 0){
                isOnline = true;
                //console.log(href + " is online!")
            }
            listOfProfiles.push( new Profile(href, isOnline) );
        }
    }
    return listOfProfiles;
}
