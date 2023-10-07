//masterFunction();

//document.getElementById("computebutton").addEventListener("click", startReload);
console.log(document.textContent);
document.getElementById("rearrange").addEventListener("click", masterFunction);

function startReload(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];
        var activeTabId = activeTab.id; // or do whatever you need
        console.log(activeTabId);
        console.log(activeTab.url);

        var code = 'window.location.reload();';
        //chrome.tabs.executeScript(activeTabId, {code: code});
     });
}

var interval;
var activeTabId;

function masterFunction(){
    getTabId();
    setInterval(reloadTab(activeTabId), 1000);
}

function getTabId(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];
        activeTabId = activeTab.id; // or do whatever you need
        console.log(activeTabId);
        console.log(activeTab.url);
        
     });
}
function reloadTab(id){
    var code = 'window.location.reload();';
    chrome.tabs.executeScript(id, {code: code});
}
