//step1 scroll down, get all users on site
//step2 receive data from server
//step3 arrange by is online, then descending by last online
//step4 filter

console.log("hello");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    masterRearrange(request);
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

var serverProfileList = [];
var pageUserList = []

function fillPageUserList(){
  var listOfProfiles = []

  var elements = document.getElementsByTagName('a');
  console.log(elements.length);
  for(var i = 0; i < elements.length; i += 1){
      var insideElements = elements[i].getElementsByClassName("usercard userrow-bucket-display-card")
      if (insideElements.length != 0 ){
          console.log("inside Elements = " + insideElements.length );
          var href = elements[i].href;
          var isOnlineElements = elements[i].getElementsByClassName("onlinedot userInfo-username-online");
          var isOnline = false;
          if (isOnlineElements.length != 0){
              isOnline = true;
          }
          listOfProfiles.push( new Profile(href, isOnline, domElement = elements[i]) );
      }
    }
    pageUserList = listOfProfiles;
}

function fillServerProfileList(jsonDict){
    for(var profileKey in jsonDict){
        if (jsonDict.hasOwnProperty(profileKey)){
            var timeSinceInHours = jsonDict[profileKey];
            var profile = new Profile( String(profileKey) , timeSinceInHours = timeSinceInHours);
            serverProfileList.push( profile );
            console.log( profileKey );
            console.log( profile.url );
        }
    } 
}

function masterRearrange(jsonDict){
    console.log("masterRearrange");
    //fillPageUserList();
    //fillServerProfileList(jsonDict)

    var storageDOM = document.getElementsByClassName("userrow-bucket-container")[0];

    

    /*
    for( var pageProfile in tempPageProfileList ){
        pageProfile.domElement.remove();
    }*/

    var listOfProfiles = [];

    /*
    var elements = document.getElementsByTagName('a');
    for(var i = 0; i < elements.length; i += 1){
        var insideElements = elements[i].getElementsByClassName("usercard userrow-bucket-display-card")
        if (insideElements.length != 0 ){
            var href = elements[i].href;
            var isOnlineElements = elements[i].getElementsByClassName("onlinedot userInfo-username-online");
            var isOnline = false;
            if (isOnlineElements.length != 0){
                isOnline = true;
            }
            listOfProfiles.push( new UserProfile( href, domElement = elements[i]) );
        }
    }*/

    var elements = document.getElementsByClassName('userrow-bucket-card-link-container');
    for(var i = 0; i < elements.length; i +=1 ){
        var href = 
    }
    var pageUserList = [];
    pageUserList = listOfProfiles;
    var serverProfileList = [];

    console.log(pageUserList.length);

    for(profileKey in jsonDict){
        if (jsonDict.hasOwnProperty(profileKey)){
            var timeSinceInHours = jsonDict[profileKey];
            //console.log( jsonDict[profileKey] );
            var profile = new Profile( String(profileKey) , timeSinceInHours);
            serverProfileList.push( profile );
        }
    } 

    orderedServerProfileList = serverProfileList.slice();
    //tempPageProfileList = pageUserList.slice();

    orderedServerProfileList.sort((a, b) => a.timeSinceInHours - b.timeSinceInHours);

    for( profile of orderedServerProfileList ){
        var url = profile.url;
        var hoursSince = profile.timeSinceInHours;

        //console.log(url);
        //console.log(hoursSince);
        for( curProfile of pageUserList ){
            if (curProfile.url == url){
                //add hours since

                if (curProfile.domElement != undefined){
                    curProfile.domElement.remove();
                    //console.log("curProfile domElement is not undefined!")
                    var newElement = curProfile.domElement.getElementsByClassName("userInfo-meta")[0];

                    if (newElement != undefined){
                        var innerHTML = newElement.innerHTML;
                        //if newElement.innerHTML.slice[:-1] 
                        newElement.innerHTML = innerHTML + "<br>Last online: " + String(hoursSince) + " *";
                    }
                    
                    storageDOM.append(curProfile.domElement);
                }
                else{
                    //console.log("curProfile domElement is undefined!");
                }

                //storageDOM.append(curProfile);
                //pageProfile = curProfile;
                //found = true;
                break;
            }
        }
    }
}


function masterFunction(){
    document.body.style.opacity = "100";
}

function UserProfile(url, domElement){
    this.url = url;
    this.domElement = domElement;
}

function Profile(url, timeSinceInHours){
  this.url = url;
  this.timeSinceInHours = timeSinceInHours;
}


