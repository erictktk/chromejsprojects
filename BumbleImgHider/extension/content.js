let observer = new MutationObserver(mutations => {
    //afterLoaded();
    const toBeRemoved = [];


    /**
     * 
     * @param {HTMLElement} element 
     */
    const recursiveSearch = (element) => {
        console.log(element.tagName)
        if (element.tagName === 'IMG'){
            toBeRemoved.push(element);
        }
        
        if (element.hasChildNodes()){
            const childNodes = element.childNodes;

            for(let i = 0; i < childNodes.length; i += 1){
                recursiveSearch(childNodes[i]);
            }
        }
        
    }

    for(const mutation of mutations) {
        console.log('hi from inside mutation observer!');



         for(const addedNode of mutation.addedNodes) {
            //console.log
            //console.log('hi from inside mutation observer!');
            console.log(addedNode.tagName);
            recursiveSearch(addedNode);
        }
    }

    console.log('toBeRemoved length = ' + toBeRemoved.length);

    for(let i = 0; i < toBeRemoved.length; i += 1){
        toBeRemoved[i].remove();
    }


 });

observer.observe(document, { childList: true, subtree: true });


//setTimeout(masterFunction, 5000)

restorePage();

function masterFunction(){
    hideImgs();
    
}



function hideImgs(){
    let elements = document.getElementsByTagName("img");

    for(let i = 0; i < elements.length; i += 1){
        elements[i].remove();
    }
}

function restorePage(){
    document.body.style.opacity = 100;
}